import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Download, Sparkles, RefreshCw } from 'lucide-react';

const formatAnalysisResults = (text) => {
    if (!text) return '';

    // Split the text into lines and process each line
    const lines = text.split('\n').filter(line => line.trim() !== '');

    // Convert the text into markdown format
    const markdownText = lines.map(line => {
        // Remove existing asterisks and clean the line
        const cleanLine = line.replace(/\*\*/g, '').trim();

        // Add markdown formatting for headers
        if (cleanLine.match(/^(Medical Condition|Confidence Score|Type|Affected Region|Recommendation|Additional Observations)/i)) {
            return `## ${cleanLine}`;
        }

        // Add bullet points for non-header lines
        if (!cleanLine.startsWith('##')) {
            // Check if the line contains a colon (key-value pair)
            if (cleanLine.includes(':')) {
                const [key, value] = cleanLine.split(':');
                return `- ${key.trim()}: ${value.trim()}`;
            }
            return `- ${cleanLine}`;
        }

        return cleanLine;
    }).join('\n\n');

    return markdownText;
};

const AnalysisResults = ({
    analysis,
    isAnalyzing,
    isSimplifying,
    isSimplified,
    onSimplify,
    onShowMedicalTerms,
    onDownloadReport
}) => {
    if (isAnalyzing) {
        return (
            <div className="flex flex-col items-center py-10">
                <div className="w-10 h-10 border-4 border-emerald-500 dark:border-emerald-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-600 dark:text-slate-400">Processing your analysis...</p>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="flex flex-col items-center py-10">
                <svg className="w-16 h-16 text-gray-300 dark:text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 dark:text-slate-400">Upload an image to receive analysis</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-700 dark:text-white">Analysis Results</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    {!isSimplified ? (
                        <button
                            onClick={onSimplify}
                            disabled={isSimplifying}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 disabled:bg-purple-400 dark:disabled:bg-purple-700 disabled:cursor-not-allowed transition-colors"
                        >
                            {isSimplifying ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    Simplifying...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4" />
                                    Simplify Terms
                                </>
                            )}
                        </button>
                    ) : (
                        <button
                            onClick={onShowMedicalTerms}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 dark:bg-slate-600 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-slate-500 transition-colors"
                        >
                            Show Medical Terms
                        </button>
                    )}
                    <button
                        onClick={onDownloadReport}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-lg hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Download Report
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700">
                <div className="prose prose-emerald dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h2: ({ node, ...props }) => (
                                <div className="flex items-start gap-2 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 flex-shrink-0"></div>
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white m-0" {...props} />
                                </div>
                            ),
                            p: ({ node, ...props }) => (
                                <p className="text-gray-600 dark:text-slate-300 pl-4 mb-4" {...props} />
                            ),
                            li: ({ node, ...props }) => {
                                const content = props.children;
                                if (typeof content === 'string' && content.includes(':')) {
                                    const [key, value] = content.split(':');
                                    return (
                                        <li className="text-gray-600 dark:text-slate-300 pl-4 mb-2">
                                            <span className="font-semibold text-gray-800 dark:text-white">{key.trim()}</span>
                                            {value && `: ${value.trim()}`}
                                        </li>
                                    );
                                }
                                return <li className="text-gray-600 dark:text-slate-300 pl-4 mb-2" {...props} />;
                            }
                        }}
                    >
                        {formatAnalysisResults(analysis)}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResults;