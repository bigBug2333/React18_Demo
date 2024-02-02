import { useEffect, useRef } from 'react';
import tinymce from 'tinymce'
declare global {
    interface Window {
        tinymce: any; // 将 tinymce 添加到 window 对象中
    }
}
const useTinyMCE = (props: { content: string, tinymceId: string }) => {
    useEffect(() => {
        const editorRef = useRef<HTMLDivElement | null>(null);
        console.log(props, editorRef)
        const initializeTinyMCE = () => {
            console.log(tinymce)
            tinymce.init({
                selector: `#${props.tinymceId}`,
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
                    console.log('xxxxx')
                    // 在编辑器初始化后设置内容
                    editor.on('init', () => {
                        console.log(888, props.content)
                        // 使用 setContent 设置内容
                        editor.setContent(props.content || '');
                    });
                },
            });
        };

        // 确保在组件挂载后再初始化 TinyMCE
        initializeTinyMCE();
        // document.getElementById(props.tinymceId) ? document.getElementById(props.tinymceId).setContent(props.content) : null
        // 组件卸载时销毁 TinyMCE
        return () => {
            if (tinymce.get(props.tinymceId)) {
                tinymce.get(props.tinymceId).remove();
            }
        };
    }, [props.tinymceId, props.content]);

    return (
        <div className="tinymceLine-container editor-container">
            {props.content}
            <textarea className="tinymce-textarea" id={props.tinymceId} key={props.tinymceId}></textarea>
        </div>
    );
};

export default useTinyMCE;
