import './index.css';
import {Diff, Decoration, Hunk, withSourceExpansion, getChangeKey, tokenize, useSourceExpansion, markEdits} from 'react-diff-view';
import {IconButton, Typography, Box, Alert, AlertTitle, SvgIcon} from "@mui/material";
import React, {useMemo, useState} from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandIcon from '@mui/icons-material/Expand';
import * as refractor from "refractor";
import 'prism-themes/themes/prism-vs.css';
import styled from "styled-components";
import { ReactComponent as GheraldIcon } from '../../../icons/gherald.svg';
import { Trans } from 'react-i18next';


const ExpandButton = styled(Box)({
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    textAlign: 'center',
    '&:hover': {
        backgroundColor: '#bdbdbd',
    }
});

const getWidgets = (hunks, modifiedLines, modifiedMethods, userGroup) => {
    const lines = Object.assign({}, ...modifiedLines.map((x) => ({[x.lineNumber]: {...x}})));

    const changes = hunks.reduce((result, {changes}) => [...result, ...changes], []);
    let methods = modifiedMethods.map(method => {
        let insert_start = method.endLine + 1;
        let delete_start = method.endLine + 1;
        changes.forEach(change => {
            if (change.type === "insert" && change.lineNumber >= method.startLine && change.lineNumber <= method.endLine) {
                insert_start = Math.min(insert_start, change.lineNumber)
            }
            if (change.type === "delete" && change.lineNumber >= method.startLine && change.lineNumber <= method.endLine) {
                delete_start = Math.min(delete_start, change.lineNumber)
            }
        })
        // const labelled_line = insert_start > method.endLine ? delete_start - 1 : insert_start - 1;
        const labelled_line = method.startLine - 1;
        const delete_only = insert_start > method.endLine;
        const insert_only = delete_start > method.endLine;
        return {
            ...method,
            labelled_line,
            delete_only,
            insert_only
        }
    })
    methods = Object.assign({}, ...methods.map((x) => ({[x.labelled_line]: {...x}})));
    const warning = userGroup != "gherald" ? [] :
        changes.filter((change) =>
            (change.type === "insert" && change.lineNumber in lines && lines[change.lineNumber]["riskScore"] > 10)
            || (change.type === "normal" && change.newLineNumber in methods && methods[change.newLineNumber]["insert_only"] && methods[change.newLineNumber]["priorChanges"] > 0)
            || (change.type === "normal" && change.oldLineNumber in methods && !methods[change.oldLineNumber]["insert_only"] && methods[change.oldLineNumber]["priorChanges"] > 0));
    return warning.reduce(
        (widgets, change) => {
            const changeKey = getChangeKey(change);
            const tokens = change.type === "insert" ? lines[change.lineNumber]["riskTokens"].split("&") : [];
            let multiTokenText = ""
            if (tokens.length > 1) {
                tokens.forEach(token => {
                    multiTokenText += `${token.split("=")[0]}(${token.split("=")[1]}), `;
                })
                multiTokenText = multiTokenText.slice(0,-2);
            }
            multiTokenText = multiTokenText.replaceAll("<" , "");
            multiTokenText = multiTokenText.replaceAll(">" , "");

            return {
                ...widgets,
                [changeKey]:
                    change.type === "insert" ?
                        <Alert severity="warning" icon={<SvgIcon component={GheraldIcon} inheritViewBox/>}>
                            {tokens.length > 1 ?
                                <span>
                                    <Trans i18nKey="gherald_line_info_prior_bugs_greater_than_10">
                                        LINE {{lineNumber: change.lineNumber}}: the tokens <b>{{multiTokenText}}</b> in this line were contained in more than <b>10</b> prior buggy lines.
                                    </Trans>
                                </span> :
                                <span>
                                    <Trans i18nKey="gherald_line_info_prior_bugs" priorBugs={tokens[0].split("=")[1]}>
                                        LINE {{lineNumber: change.lineNumber}}: the token <b>{{token: tokens[0].split("=")[0]}}</b> in this line were contained in <b>{{priorBugs: tokens[0].split("=")[1]}}</b> prior buggy lines.
                                    </Trans>
                                </span>
                            }

                            {/*LINE {change.lineNumber}: the tokens in this line were contained in {lines[change.lineNumber]["riskScore"]} prior buggy {lines[change.lineNumber]["riskScore"] > 1 ? "lines" : "line"}.*/}
                            {/*{tokens.length > 1 ? `LINE ${change.lineNumber}: thlineNumbere tokens <b>${multiTokenText}</b> in this line were contained in more than <b>10</b> prior buggy lines.` : `LINE ${change.lineNumber}: the token <b>${tokens[0].split("=")[0]}</b> in this line were contained in <b>${tokens[0].split("=")[1]}</b> prior buggy lines.`}*/}
                            {/*LINE {change.lineNumber}: the tokens in this line were contained in more than 10 prior buggy lines.*/}
                        </Alert>
                        :
                        (change.oldLineNumber in methods && !methods[change.oldLineNumber]["insert_only"]) ?
                            <Alert severity="warning" icon={<SvgIcon component={GheraldIcon} inheritViewBox/>}>
                                {methods[change.oldLineNumber]["priorChanges"] > 1 ?
                                    <span>
                                        <Trans i18nKey="gherald_method_info_prior_change_plural" priorChanges={methods[change.oldLineNumber]["priorChanges"]}>
                                            METHOD: This method [<b>{{method: methods[change.oldLineNumber]["name"].split("(")[0] + "()"}}</b>] has been modified in <b>{{priorChanges: methods[change.oldLineNumber]["priorChanges"]}}</b> prior changes.
                                        </Trans>
                                        <Trans i18nKey="gherald_method_info_prior_bug" priorBugs={methods[change.oldLineNumber]["priorBugs"]}>
                                            Among these changes, <b>{{priorBugs: methods[change.oldLineNumber]["priorBugs"]}}</b> bugs have been found in this method.
                                        </Trans>
                                    </span> :
                                    <span>
                                        <Trans i18nKey="gherald_method_info_prior_change">
                                            METHOD: This method [<b>{{method: methods[change.oldLineNumber]["name"]}}</b>] has been modified in <b>1</b> prior change and <b>{{priorBugs: methods[change.oldLineNumber]["priorBugs"]}}</b> bug has been found.
                                        </Trans>
                                    </span>
                                }
                                {/*METHOD: This method [{methods[change.oldLineNumber]["name"]}] has been modified in {methods[change.oldLineNumber]["priorChanges"]} prior changes. Among these changes, {methods[change.oldLineNumber]["priorBugs"]} {methods[change.oldLineNumber]["priorBugs"] > 1 ? "bugs have" : "bug has"} been found in this method.*/}
                                {/*METHOD: there have been {methods[change.oldLineNumber]["priorBugs"]} prior bugs among {methods[change.oldLineNumber]["priorChanges"]} changes in method {methods[change.oldLineNumber]["name"]}*/}
                            </Alert>
                            :
                            <Alert severity="warning" icon={<SvgIcon component={GheraldIcon} inheritViewBox/>}>
                                {methods[change.newLineNumber]["priorChanges"] > 1 ?
                                    <span>
                                        <Trans i18nKey="gherald_method_info_prior_change_plural" priorChanges={methods[change.newLineNumber]["priorChanges"]}>
                                            METHOD: This method [<b>{{method: methods[change.newLineNumber]["name"].split("(")[0] + "()"}}</b>] has been modified in <b>{{priorChanges: methods[change.newLineNumber]["priorChanges"]}}</b> prior changes.
                                        </Trans>
                                        <Trans i18nKey="gherald_method_info_prior_bug" priorBugs={methods[change.newLineNumber]["priorBugs"]}>
                                            Among these changes, <b>{{priorBugs: methods[change.newLineNumber]["priorBugs"]}}</b> bugs have been found in this method.
                                        </Trans>
                                    </span> :
                                    <span>
                                        <Trans i18nKey="gherald_method_info_prior_change">
                                            METHOD: This method [<b>{{method: methods[change.newLineNumber]["name"]}}</b>] has been modified in <b>1</b> prior change and <b>{{priorBugs: methods[change.newLineNumber]["priorBugs"]}}</b> bug has been found.
                                        </Trans>
                                    </span>

                                }

                                {/*METHOD: This method [{methods[change.newLineNumber]["name"]}] has been modified in {methods[change.newLineNumber]["priorChanges"]} prior changes. Among these changes {methods[change.newLineNumber]["priorBugs"]} {methods[change.newLineNumber]["priorBugs"] > 1 ? "bugs have" : "bug has"} been found in this method.*/}
                                {/*METHOD: there have been {methods[change.newLineNumber]["priorBugs"]} prior bugs among {methods[change.newLineNumber]["priorChanges"]} changes in method {methods[change.newLineNumber]["name"]}*/}
                            </Alert>
            };
        },
        {}
    );
};

const ExpandUpAll = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-up" size="small">
                    <ExpandLessIcon />
                    <Typography variant="button" color="text.secondary">Expand all {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const ExpandAll = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-all" size="small">
                    <ExpandIcon />
                    <Typography variant="button" color="text.secondary">Expand all {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const ExpandUp = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-up" size="small">
                    <ExpandLessIcon />
                    <Typography variant="button" color="text.secondary">Expand up {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const ExpandDown = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-down" size="small">
                    <ExpandMoreIcon />
                    <Typography variant="button" color="text.secondary">Expand down {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const ExpandDownAll = ({start, end, onClick}) => {
    const lines = end - start;
    return (
        <Decoration>
            <ExpandButton sx={{ width: '100%' }} onClick={() => onClick(start, end)}>
                <IconButton aria-label="expand-down" size="small">
                    <ExpandMoreIcon />
                    <Typography variant="button" color="text.secondary">Expand all {lines} lines</Typography>
                </IconButton>
            </ExpandButton>
        </Decoration>
    );
};

const renderToken = (token, defaultRender, i) => {
    switch (token.type) {
        case 'space':
            console.log(token);
            return (
                <span key={i} className="space">
                    {token.children && token.children.map((token, i) => renderToken(token, defaultRender, i))}
                </span>
            );
        default:
            return defaultRender(token, i);
    }
};

const DiffView = ({hunks, oldSource, linesCount, modifiedLines, modifiedMethods, userGroup}) => {
    const [renderingHunks, expandRange] = useSourceExpansion(hunks, oldSource);
    const options = {
        refractor: refractor,
        highlight: true,
        // oldSource: oldSource,
        // apache: language: 'cpp',
        language: 'cpp',
        enhancers: [
            markEdits(renderingHunks)
            // markEdits(renderingHunks, {type: 'block'})
        ],
    };
    const tokens = tokenize(renderingHunks, options);
    // console.log(hunks);
    // console.log(tokens);
    // const tokens = useMemo(() => tokenize(hunks, oldSource), [hunks]);

    const renderHunk = (children, hunk, index) => {

        const previousElement = children[children.length - 1];

        if (previousElement) {
            const previousHunk = previousElement.props.hunk;
            const previousEnd = previousHunk.oldStart + previousHunk.oldLines;
            const currentStart = hunk.oldStart;
            if (currentStart - previousEnd < 20) {
                const expandAllElement = (
                    <ExpandAll
                        key={'expand-all-' + hunk.oldStart + hunk.content}
                        start={previousEnd}
                        end={currentStart}
                        onClick={expandRange}
                    />
                );
                children.push(expandAllElement);
            } else {
                const expandDownElement = (
                    <ExpandDown
                        key={'expand-down-' + hunk.oldStart + hunk.content}
                        previousHunk={previousHunk}
                        start={previousEnd}
                        end={previousEnd + 20}
                        onClick={expandRange}
                    />
                );
                const expandUpElement = (
                    <ExpandUp
                        key={'expand-up-' + hunk.oldStart + hunk.content}
                        start={hunk.oldStart - 20}
                        end={currentStart}
                        onClick={expandRange}
                    />
                );
                children.push(expandDownElement);
                children.push(expandUpElement);
            }
        } else {
            const currentStart = hunk.oldStart;
            if (currentStart > 1) {
                const expandUpAllElement = (
                    <ExpandUpAll
                        key={'expand-up-all' + hunk.oldStart + hunk.content}
                        start={1}
                        end={currentStart}
                        onClick={expandRange}
                    />
                );
                children.push(expandUpAllElement);
            }
            if (currentStart > 20) {
                const expandUpElement = (
                    <ExpandUp
                        key={'expand-up-' + hunk.oldStart + hunk.content}
                        start={currentStart - 20}
                        end={currentStart}
                        onClick={expandRange}
                    />
                );
                children.push(expandUpElement);
            }
        }

        const hunkElement = (
            <Hunk
                key={'hunk-' + hunk.content}
                hunk={hunk}
            />
        );
        children.push(hunkElement);


        if (index === renderingHunks.length - 1) {
            const currentEnd = hunk.oldStart + hunk.oldLines;
            if (currentEnd + 20 < linesCount) {
                const expandDownElement = (
                    <ExpandDown
                        key={'expand-down-20-' + hunk.oldStart + hunk.content}
                        start={currentEnd}
                        end={currentEnd + 20}
                        onClick={expandRange}
                    />
                )
                children.push(expandDownElement);
            }
            if (currentEnd <  linesCount) {
                const expandDownAllElement = (
                    <ExpandDownAll
                        key={'expand-down-all' + hunk.oldStart + hunk.content}
                        start={currentEnd}
                        end={linesCount}
                        onClick={expandRange}
                    />
                )
                children.push(expandDownAllElement);
            }
        }
        return children;
    };

    return (
        <Diff className={"diff-view"} hunks={renderingHunks} diffType="modify" viewType="split" tokens={tokens} widgets={getWidgets(renderingHunks, modifiedLines, modifiedMethods, userGroup)}>
            {hunks => hunks.reduce(renderHunk, [])}
        </Diff>
    );
};

export default DiffView;
