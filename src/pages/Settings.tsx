import { CopyButton } from '../components/ui/CopyButton';

export function Settings() {
  const appId = 'global_template__global_template_v1';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="font-serif text-lg font-semibold mb-4">App Configuration</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Application ID</label>
            <div className="relative">
              <input 
                type="text" 
                readOnly 
                value={appId}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-mono text-sm"
              />
              <CopyButton textToCopy={appId} />
            </div>
            <p className="text-xs text-gray-500 mt-2">This ID is used for all Firebase database paths.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
