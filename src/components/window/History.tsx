import { useHistoryStore } from "../../store/history";
import CodeEditor from '@uiw/react-textarea-code-editor';

// import getObjectDiff, { applyDiffChanges, removeDiffChange } from "../../utils/getObjectDiff";

// const difference = getObjectDiff(lhs, rhs);
// const withChange = applyDiffChanges(lhs, difference);
// const withoutChange = removeDiffChange(lhs, difference);

export default function History() {
  const { history } = useHistoryStore()

  if(!history.length) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">
          No change identified
        </p>
      </div>
    )
  }
  return (
    <div>
      <CodeEditor
        value={JSON.stringify(history, null, 2)}
        language="json"
        padding={15}
        disabled
      />
    </div>
  )
}