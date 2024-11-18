
import React, { useState } from 'react';
import { ContentEditor } from '../components/Editor/ContentEditor';
import { useContentStore } from '../store/contentStore';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { generateContent } from '../lib/gemini';
import { Clipboard } from 'lucide-react';  // Import the clipboard icon
// import Footer from '../components/Layout/Footer';

export const Create = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [contentType, setContentType] = useState('blog post');
  const [mood, setMood] = useState('informative');
  const [copied, setCopied] = useState(false); // State to track copied status
  const { createContent } = useContentStore();
  const { user } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }

    try {
      setGenerating(true);
      const generatedContent = await generateContent(prompt, contentType, mood);

      // Format the generated content (Replace newlines with <br/> and wrap with <div>)
      const formattedContent = generatedContent
        .replace(/\n/g, '<br/>')  // Ensure each line break in the generated content is treated as a <br />
        .replace(/^(.*)$/gm, '<p>$&</p>'); // Wrap each line in a <p> tag

      setContent(formattedContent);
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error('Failed to generate content');
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Please add a title');
      return;
    }

    try {
      await createContent({
        title,
        content,
        userId: user?.uid,
        createdAt: new Date().toISOString(),
      });
      toast.success('Content saved successfully!');
    } catch (error) {
      toast.error('Failed to save content');
    }
  };

  // Copy content to clipboard
  const handleCopyToClipboard = () => {
    const text = content.replace(/<br\s*\/?>/g, '\n').replace(/<\/p>/g, '').replace(/<p>/g, ''); // Clean the HTML tags for plain text
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset "Copied" state after 2 seconds
      })
      .catch((error) => toast.error('Failed to copy content'));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <style>
        {`
          .button {
            padding: 12px 24px;
            font-size: 16px;
            background-color: transparent;
            color: #39ff14;
            border: 2px solid #39ff14;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
            transition: background-color 0.3s, transform 0.3s, color 0.3s;
          }

          .button:hover {
            background-color: #39ff14;
            color: #000;
            transform: scale(1.05);
          }

          .button.active {
            background-color: #39ff14;
            color: #000;
          }

          .input-box {
            background-color: transparent;
            border: 2px solid #444;
            border-radius: 8px;
            color: #fff;
            padding: 12px;
            font-size: 16px;
            width: 100%;
            outline: none;
            transition: border-color 0.3s, box-shadow 0.3s;
          }

          .input-box:focus {
            border-color: #39ff14;
            box-shadow: 0 0 8px #39ff14;
          }

          textarea.input-box {
            resize: none;
          }

          .content-preview {
            position: relative;
            margin-bottom: 16px;
          }

          .copy-btn {
            position: absolute;
            top: 0;
            right: 0;
            background-color: #39ff14;
            border: none;
            padding: 8px;
            border-radius: 50%;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .copy-btn:hover {
            background-color: #28cc12;
          }

          .copied-tooltip {
            position: absolute;
            top: -20px;
            right: 0;
            font-size: 12px;
            color: #fff;
            background-color: #28cc12;
            padding: 4px 8px;
            border-radius: 4px;
          }
        `}
      </style>

      <div className="glass-panel p-6 mb-6">
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-box"
        />
      </div>

      <div className="glass-panel p-6 mb-6">
        <textarea
          placeholder="Enter your prompt for AI generation..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="input-box"
          rows={3}
        />

        <h3 className="text-xl mb-2 text-gray-200 mt-4">Select Content Type:</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {['blog post', 'film script', 'reel script', 'social media post'].map((type) => (
            <button
              key={type}
              className={`button ${contentType === type ? 'active' : ''}`}
              onClick={() => setContentType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <h3 className="text-xl mb-2 text-gray-200">Select Mood:</h3>
        <div className="grid grid-cols-4 gap-4 mb-6">
          {['informative', 'casual', 'persuasive', 'humorous'].map((moodType) => (
            <button
              key={moodType}
              className={`button ${mood === moodType ? 'active' : ''}`}
              onClick={() => setMood(moodType)}
            >
              {moodType}
            </button>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className={`button ${generating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {generating ? 'Generating...' : 'Generate with AI'}
        </button>
      </div>

      {content && (
        <div className="glass-panel p-6 mb-6">
          <h3 className="text-2xl font-semibold mb-4">Generated Content</h3>
          <div className="content-preview">
            {/* Copy Button */}
            <button className="copy-btn" onClick={handleCopyToClipboard}>
              <Clipboard size={18} color="#000" />
            </button>
            {copied && <div className="copied-tooltip">Copied!</div>}

            <div
              className="content-text"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button onClick={handleSave} className="button">
          Save
        </button>
      </div>

      
    </div>
  );
};
