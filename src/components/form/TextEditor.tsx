import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Bold, Heading2, Heading3, Italic, List, ListOrdered } from "lucide-react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

import "@/styles/tiptap.css";

// Toolbar component(child)
interface ToolbarButtonProps{
   onClick: () => void;
   isActive?: boolean;
   children: React.ReactNode;
}

const ToolbarButton = ({ onClick, isActive, children }: ToolbarButtonProps) => (
   <Button type="button" onClick={onClick} className={cn("p-2 rounded-sm bg-gray-100 hover:bg-gray-200 transition-colors", isActive ? "bg-gray-200 text-gray-900" : "text-gray-600")}>
      {children}
   </Button>
)

// Editor component(Parent)
interface TextEdirorProps{
   value: string;
   onChange: ( value: string) => void;
   placeholder?: string;
}

const TextEditor = ({ value, onChange, placeholder }: TextEdirorProps) => {
   const editor = useEditor({
      extensions: [StarterKit],
      content: value,
      editorProps: {
         attributes: {
            class: 'prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4'
         }
      },
      onUpdate: ({ editor }) => {
         onChange(editor.getHTML())
      }
   });

   // Sync external value changes
   useEffect(() => {
      if(editor && value !== editor.getHTML()){
         editor.commands.setContent(value)
      }
   }, [value, editor]);

   if(!editor) return null;

   return (
      <div className="border border-gray-200 rounded-md bg-white overflow-hidden">
         {/* TOOLBAR */}
         <div className="border-b border-gray-200 bg-gray-50 p-2 flex gap-1">
            <ToolbarButton 
               onClick={() => editor.chain().focus().toggleBold().run()}
               isActive={editor.isActive('bold')}
            >
               <Bold className="size-4" />
            </ToolbarButton>
            <ToolbarButton
               onClick={() => editor.chain().focus().toggleItalic().run()}
               isActive={editor.isActive('italic')}
            >
               <Italic className="size-4" />
            </ToolbarButton>

            <div className="w-px bg-gray-300 mx-1" />

            <ToolbarButton
               onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
               isActive={editor.isActive('heading', { level: 2 })}
            >
               <Heading2 className="size-4" />
            </ToolbarButton>
            <ToolbarButton
               onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
               isActive={editor.isActive('heading', { level: 3 })}
            >
               <Heading3 className="size-4" />
            </ToolbarButton>

            <div className="w-px bg-gray-300 mx-1" />

            <ToolbarButton
               onClick={() => editor.chain().focus().toggleBulletList().run()}
               isActive={editor.isActive('bulletList')}
            >
               <List className="size-4" />
            </ToolbarButton>
            <ToolbarButton
               onClick={() => editor.chain().focus().toggleOrderedList().run()}
               isActive={editor.isActive('orderList')}
            >
               <ListOrdered className="size-4" />
            </ToolbarButton>
         </div>
         
         {/* EDITOR */}
         <EditorContent
            editor={editor}
            placeholder={placeholder}
         />
      </div>
   )
}

export default TextEditor