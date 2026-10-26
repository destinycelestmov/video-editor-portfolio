/* ==========================================================================
   YOUR CONTENT LIVES HERE. Edit this file to change text, links, folders and projects.
   You never need to touch main.js or styles.css for normal updates.

   HOW TO ADD A PROJECT: copy one project block ({ ... }) inside a folder's "projects" list,
   paste it after a comma, then change:
     "title"        the name shown under the video
     "description"  optional short text ("" to hide it)
     "image"        a still frame, e.g. "assets/img/my-project.jpg" (shown before the video loads)
     "loop"         a short silent preview, e.g. "assets/video/my-project.mp4" ("" to use the Drive/YouTube player instead)
     "ratio"        "3 / 4" for vertical videos; leave out for horizontal ones
     "url"          the link to the full video (Google Drive, YouTube, Vimeo...). "" = no link.

   HOW TO ADD A FOLDER: copy a whole folder block (from { "id": ... to its closing }) and give it a new unique "id".
   Folder colors: use #5B464D (mauve), #F18B4D (tangerine) or #53141F (wine red) for "color";
   use "#FFFBCC" for "text" on dark folders and "#53141F" on the tangerine one.

   Run "npm run check" any time to catch typos, missing files and bad links.
   ========================================================================== */

const site = {
  "name": [
    "Destiny",
    "Jimenez"
  ],
  "issue": "Portfolio, Issue 01",
  "coverTitle": "Video Editor + Visual Storyteller",
  "tagline": "Turning raw footage into visual stories that feel intentional, engaging, and memorable.",
  "about": {
    "photo": "assets/img/portrait.jpg",
    "photoCaption": "Destiny",
    "intro": "Hi, I’m Destiny. I’m a video editor with a creative eye, growing skills, and a love for turning ordinary footage into something that engages audiences. Great editing is more than what you see, it’s also about what you will remember.",
    "blocks": [
      {
        "title": "What sets me apart",
        "text": "I love to express any story, product, or moment through video. My passion and drive to achieve my dream is what sets me apart."
      },
      {
        "title": "Education",
        "text": "Santa Monica College: Film Production. Associate degree: current."
      }
    ],
    "skillsTitle": "Software",
    "skills": [
      "DaVinci Resolve",
      "Canva",
      "CapCut",
      "Adobe After Effects"
    ]
  },
  "workNote": "Select a folder tab to open it.",
  "contact": {
    "invite": "Got a project, idea, or product needing visual expression? Feel free to get in touch with me for any questions, partnerships, or projects. Let’s start turning your ideas into a gravitating reality.",
    "email": "destinycelest.mov@gmail.com",
    "phone": "(818) 456-2214",
    "instagram": "https://www.instagram.com/destiny.celest",
    "linkedin": "",
    "behance": "",
    "other": [],
    "location": ""
  }
};

/* Folders (the manila tabs in "My Work"). Order here = order on the page. */
const categories = [
  {
    "id": "commercial",
    "title": "Commercial/Ad",
    "color": "#5B464D",
    "text": "#FFFBCC",
    "description": "Spec ads, product videos, social commercials. Product storytelling, motion graphics, brand aesthetic, campaign concepts.",
    "projects": [
      {
        "id": "c2",
        "title": "Prism Makeup",
        "description": "Cut raw footage, color graded, music overlay.",
        "image": "assets/img/prism-makeup.jpg",
        "loop": "assets/video/prism-makeup.mp4",
        "year": "",
        "role": "Spec ad",
        "url": "https://drive.google.com/file/d/1mM5C4QswKAshec4Hy9cLs94co5KnxtF_/view?usp=drive_link"
      },
      {
        "id": "c1",
        "title": "Freely Jeans",
        "description": "Cut raw footage, color graded, music overlay.",
        "image": "assets/img/freely-jeans.jpg",
        "loop": "assets/video/freely-jeans.mp4",
        "ratio": "3 / 4",
        "year": "",
        "role": "Spec ad",
        "url": "https://drive.google.com/file/d/1z6c-qmQxZdiyEXRWuqZAyoQTyOsQTo2f/view?usp=drive_link"
      },
      {
        "id": "c3",
        "title": "Sannsa Camera",
        "description": "Cut raw footage, color graded, music overlay, sound design.",
        "image": "assets/img/sannsa-camera.jpg",
        "loop": "assets/video/sannsa-camera.mp4",
        "year": "",
        "role": "Spec ad",
        "url": "https://drive.google.com/file/d/1hNO8PmAywxH5BS9jz5n0KsSasnO0oJB9/view?usp=drive_link"
      }
    ]
  },
  {
    "id": "short",
    "title": "Short-Form Content",
    "color": "#F18B4D",
    "text": "#53141F",
    "description": "Reels, TikTok, social ads. Reviews, vlogs, DITL. Hook and pacing, music and sound design, captions and typography, vertical formatting.",
    "projects": [
      {
        "id": "s1",
        "title": "Music Shopping",
        "description": "",
        "image": "assets/img/music-shopping.jpg",
        "loop": "assets/video/music-shopping.mp4",
        "ratio": "3 / 4",
        "year": "",
        "role": "",
        "url": "https://drive.google.com/file/d/1zkT_CjV7FTJCA5Bs32ffeVKdyYr5XcS3/view?usp=drive_link"
      },
      {
        "id": "s2",
        "title": "Pizza Review",
        "description": "",
        "image": "assets/img/pizza-review.jpg",
        "loop": "assets/video/pizza-review.mp4",
        "ratio": "3 / 4",
        "year": "",
        "role": "",
        "url": "https://drive.google.com/file/d/1-4nvqX24zBdmL5e64zg_iRPKMBuOzpRY/view?usp=drive_link"
      },
      {
        "id": "s3",
        "title": "Japanese Garden",
        "description": "",
        "image": "assets/img/japanese-garden.jpg",
        "loop": "assets/video/japanese-garden.mp4",
        "ratio": "3 / 4",
        "year": "",
        "role": "",
        "url": "https://drive.google.com/file/d/18Z1xPRiSzTMxrn8t1RBKpHB7SkZDPaYT/view?usp=drive_link"
      }
    ],
    "footer": "Designed for social content, intros, reels, and hyper-visual. Aspect ratio adjustments, clips cut for audience grabbing, audio selection, current trends."
  },
  {
    "id": "cinematic",
    "title": "Cinematic",
    "color": "#53141F",
    "text": "#FFFBCC",
    "description": "Lifestyle, editorial, visual stories. Narrative pacing, colorgrading, music, visual composition, storytelling.",
    "projects": [
      {
        "id": "m1",
        "title": "MD28",
        "description": "",
        "image": "assets/img/md28.jpg",
        "loop": "assets/video/md28.mp4",
        "year": "",
        "role": "",
        "url": "https://drive.google.com/file/d/1az61vuEnlxkJAA1StK9SBQBX4s7irDiL/view?usp=drive_link"
      },
      {
        "id": "m2",
        "title": "SD Scenic",
        "description": "",
        "image": "assets/img/sd-scenic.jpg",
        "loop": "assets/video/sd-scenic.mp4",
        "year": "",
        "role": "",
        "url": "https://drive.google.com/file/d/1lixQHY5zpbbuZbacUKYIdyEdZm3jgCun/view?usp=drive_link"
      }
    ],
    "footer": "Reviewed hours of footage, cut and edited gravitating clips, color graded, audio and music selection."
  }
];
