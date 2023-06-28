import { IconCheck, IconLoader, IconX } from '@tabler/icons-react'
import toast, { useToaster } from 'react-hot-toast/headless';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Notifications() {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts
        .filter((current) => current.visible)
        .map((current) => (
          <div key={current.id} {...current.ariaProps} className="absolute bottom-20 right-20">
            <Alert className="flex px-3 py-2">
              {current.type === 'loading' ? (<div className="w-6 h-6 p-1 mr-2 rounded-full bg-slate-600 rotate"><IconLoader size="1rem" /></div>) : null}
              {current.type === 'success' ? (<div className="w-6 h-6 p-1 mr-2 rounded-full bg-green-600"><IconCheck size="1rem" /></div>) : null}
              {current.type === 'error' ? (<div className="w-6 h-6 p-1 mr-2 rounded-full bg-red-600"><IconX size="1rem" /></div>) : null}
              <div className="flex flex-1 flex-col">
                <AlertTitle className=" font-bold">
                  {String(current?.message).split('\n')[0]}
                </AlertTitle>
                {String(current?.message).split('\n')[1] && (
                  <AlertDescription>
                    {String(current?.message).split('\n')[1]}
                  </AlertDescription>
                )}
              </div>

              {current.type !== 'loading' && (
                <button onClick={() => toast?.dismiss(current.id)} className="ml-4">
                  <IconX size="1rem" />
                </button>
              )}
            </Alert>
          </div>
        ))}
    </div>
  );
}