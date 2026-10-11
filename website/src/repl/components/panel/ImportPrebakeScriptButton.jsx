import { errorLogger } from '@strudel/core';
import { storePrebakeScript } from '../../../settings.mjs';
import { confirmDialog } from '../../util.mjs';
import { SpecialActionInput } from '../button/action-button';

function importScript(script, updateEditor) {
  const reader = new FileReader();
  reader.readAsText(script);

  reader.onload = () => {
    const text = reader.result;
    storePrebakeScript(text);
    updateEditor?.(text);
  };

  reader.onerror = () => {
    errorLogger(new Error('не удалось импортировать prebake-скрипт'), 'importScript');
  };
}

export function exportScript(script) {
  const blob = new Blob([script], { type: 'application/javascript' });
  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(blob);
  const date = new Date().toISOString().split('T')[0];
  downloadLink.download = `prebake_${date}.strudel`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export function ImportPrebakeScriptButton({ updateEditor }) {
  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const confirmed = await confirmDialog('Текущий prebake-скрипт будет заменён. Продолжить?');
    if (!confirmed) return;
    importScript(file, updateEditor);
  };
  return (
    <SpecialActionInput
      type="file"
      label="импортировать prebake-скрипт"
      accept=".strudel,.js"
      onChange={handleChange}
    />
  );
}
