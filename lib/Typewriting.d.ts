import * as React from "react";
declare type DelayNumber = number | [number, number];
interface Props {
    strings: string[];
    waitBeforeDeleteMs?: DelayNumber;
    writeSpeedMs?: DelayNumber;
    deleteSpeedMs?: DelayNumber;
    children: ({ currentText }: {
        currentText: string;
    }) => React.ReactNode;
}
interface State {
    currentStringIdx: number;
    currentCharPos: number;
    isDeleting: boolean;
}
export default class Typewriting extends React.PureComponent<Props, State> {
    private tickTimeout;
    state: {
        currentStringIdx: number;
        currentCharPos: number;
        isDeleting: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    private queueTick;
    private moveToNextText;
    private tick;
    render(): JSX.Element;
}
export {};
