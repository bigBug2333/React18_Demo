import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        tinymce: any; // 将 tinymce 添加到 window 对象中
    }
}

const useTinyMCE = (
    initialValue: string,
    options: Record<string, any> = {},
    onChange?: (content: string) => void
) => {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (editorRef.current) {
            const { tinymce } = window;

            // 引入 TinyMCE 插件
            import('tinymce/tinymce').then(() => {
                // 初始化 TinyMCE
                tinymce.init({
                    target: editorRef.current,
                    setup: (editor: any) => {
                        editor.on('init', () => {
                            // 编辑器初始化完成后，设置初始内容
                            editor.setContent(initialValue || '');
                        });

                        // 监听编辑器内容变化
                        editor.on('change', () => {
                            const content = editor.getContent();
                            if (onChange) {
                                onChange(content);
                            }
                        });
                    },
                    ...options,
                });
            });
        }

        // 在组件卸载时销毁 TinyMCE
        return () => {
            if (editorRef.current) {
                const { tinymce } = window;
                if (tinymce && tinymce.EditorManager) {
                    tinymce.EditorManager.execCommand('mceRemoveEditor', true, editorRef.current.id);
                }
            }
        };
    }, [initialValue, options, onChange]);

    return editorRef;
};

export default useTinyMCE;
