import * as cs from "classnames";
import * as React from "react";

import { BaseReactProps } from "../../types";
import { Modal } from "../Modal";

import * as styles from "./ExampleModal.less";

export interface ExampleModalProps extends BaseReactProps
{
    show: boolean;

    onOK?: () => void;
    onCancel?: () => void;
}

export const ExampleModal = (props: ExampleModalProps) =>
{
    const { className, show, onOK = noop, onCancel = noop } = props;
    return (
        <Modal
            className={cs(className)}
            show={show}
            onKeyDown={_handleKeyDown}
            onMaskClick={onCancel}
        >
            <div className={styles.content}>
                <div className={styles.title}>Tips</div>
                <div className={styles.divider} />
                <div className={styles.main}>Press Esc or click the buttons.</div>
                <div className={styles.footer}>
                    <div className={cs(styles.btn, styles.btnCancel)} onClick={onCancel}>Cancel</div>
                    <div className={cs(styles.btn, styles.btnOK)} onClick={onOK}>OK</div>
                </div>
            </div>
        </Modal>
    );

    function _handleKeyDown(e: KeyboardEvent)
    {
        // Escape to cancel.
        if (e.keyCode === 27)
        {
            onCancel();
        }
    }
};

function noop() { }