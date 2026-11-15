/** A question with a few answers, in the browser's own modal dialog (it can't be dismissed). */
import { useEffect, useRef } from 'react';

export interface Choice {
  readonly label: string;
  readonly hint?: string;
  readonly pick: () => void;
}

export function ChoiceDialog(props: {
  readonly title: string;
  readonly choices: readonly Choice[];
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  return (
    <dialog ref={dialog} className="choice" onCancel={(e) => e.preventDefault()}>
      <h2>{props.title}</h2>
      {props.choices.map((c) => (
        <button
          key={c.label}
          onClick={() => {
            dialog.current?.close();
            c.pick();
          }}
        >
          {c.label}
          {c.hint && <small>{c.hint}</small>}
        </button>
      ))}
    </dialog>
  );
}
