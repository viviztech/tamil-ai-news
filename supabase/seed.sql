-- Seed Categories (AI Focused)
INSERT INTO categories (slug, name_en, name_ta) VALUES
('generative-ai', 'Generative AI', 'ஜெனரேட்டிவ் AI'),
('machine-learning', 'Machine Learning', 'இயந்திர கற்றல்'),
('robotics', 'Robotics', 'ரோபோட்டிக்ஸ்'),
('llms', 'Large Language Models', 'மொழி மாதிரிகள்'),
('ai-ethics', 'AI Ethics', 'AI நெறிமுறைகள்'),
('startups', 'AI Startups', 'AI நிறுவனங்கள்')
ON CONFLICT (slug) DO UPDATE SET
name_en = EXCLUDED.name_en,
name_ta = EXCLUDED.name_ta;
