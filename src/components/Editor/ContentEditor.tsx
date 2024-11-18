// import React from 'react';
// import { useEditor, EditorContent } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Placeholder from '@tiptap/extension-placeholder';

// interface ContentEditorProps {
//   content: string;
//   onChange: (content: string) => void;
// }

// export const ContentEditor = ({ content, onChange }: ContentEditorProps) => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Placeholder.configure({
//         placeholder: 'Start typing or use AI to generate content...',
//       }),
//     ],
//     content,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//   });

//   return (
//     <div className="glass-panel p-4">
//       <EditorContent 
//         editor={editor} 
//         className="prose prose-invert max-w-none"
//       />
//     </div>
//   );
// };

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

interface ContentEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const ContentEditor = ({ content, onChange }: ContentEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing or use AI to generate content...',
      }),
    ],
    content, // Initial content
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Update parent state on editor changes
    },
  });

  // Synchronize editor content with `content` prop
  useEffect(() => {
    if (editor && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="glass-panel p-4">
      <EditorContent 
        editor={editor} 
        className="prose prose-invert max-w-none"
      />
    </div>
  );
};
