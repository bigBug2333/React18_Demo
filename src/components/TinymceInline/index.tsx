import React, { useEffect, useRef } from 'react';
import tinymce from 'tinymce';

interface TinyMCEViewerProps {
    content: string;
    tinymceId: string;
}

const TinyMCEViewer: React.FC<TinyMCEViewerProps> = ({ content, tinymceId }) => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (editorRef.current) {
            console.log(999, editorRef, tinymce, content, tinymceId)

            tinymce.init({
                selector: `#${tinymceId}`,
                // readonly: false, // 设置编辑器为只读模式
                language: 'zh_CN',
                // height: 360,
                // max_height:360,
                // toolbar: toolbar,
                plugins: 'print preview searchreplace autolink directionality visualblocks visualchars image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave bdmap indent2em autoresize formatpainter axupimgs',
                toolbar: false,
                menubar: false,
                // plugins: plugins,
                body_class: 'panel-body ',
                object_resizing: false,
                end_container_on_empty_block: true,
                powerpaste_word_import: 'clean',
                code_dialog_height: 450,
                code_dialog_width: 1000,
                advlist_bullet_styles: 'square',
                advlist_number_styles: 'default',
                imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
                imagetools_toolbar: 'watermark',
                default_link_target: '_blank',
                link_title: false,
                branding: false,
                statusbar: false,
                setup: (editor) => {
                    editor.on('init', () => {
                        editor.setContent('123');
                    });
                },
            });
        }

        return () => {
            if (tinymce.get(tinymceId)) {
                tinymce.get(tinymceId).remove();
            }
        };
    }, [tinymceId]);

    useEffect(() => {
        if (tinymce.get(tinymceId)) {
            console.log('set', content)
            tinymce.get(tinymceId).setContent(content);
        }
    }, [content, tinymceId]);

    return (
        <div ref={editorRef} style={{ height: "500px" }}>
            <textarea id={tinymceId} ></textarea>
        </div>
    );
};

export default TinyMCEViewer;
