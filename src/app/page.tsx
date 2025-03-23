import { getExperienceData } from "@/lib/notion/experience";
import { getEducationData } from "@/lib/notion/education";
import { getProjectsData } from "@/lib/notion/projects";
import { notionColorMap } from "@/lib/notion/colorMap";

type ProjectStack = {
  name: string;
  color: string;
};

type ProjectItem = {
  id: string;
  name: string;
  stack: { name: string; color: string }[];  
  description: string;
  link?: string;
};

type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  description: string;
};

type ExperienceItem = {
  id: string;
  position: string;
  company: string;
  description: string;
  start?: string | null;
  end?: string | null;

};


export default async function HomePage() {
  const [experience, education, projects] = await Promise.all([
    getExperienceData(),
    getEducationData(),
    getProjectsData(),
  ]);


  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          👋 Hi, I’m SumFei
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          I build clean, functional web experiences using Next.js and Notion.
        </p>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">💼 Work Experience</h2>
        <div className="space-y-6">
          {experience.map((exp: ExperienceItem) => (
            <div key={exp.id}>
              <h3 className="text-lg font-bold">{exp.position}</h3>
              <p className="text-sm text-gray-800">{exp.company}</p>
              <p className="text-sm text-gray-500">
                {exp.start &&
                  new Date(exp.start).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                –{' '}
                {exp.end
                  ? new Date(exp.end).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Present'}
              </p>

              <p className="">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">🎓 Education</h2>
        <div className="space-y-6">
          {education.map((edu: EducationItem) => (
            <div key={edu.id}>
              <h3 className="text-lg font-bold">{edu.institution}</h3>
              <p className="text-sm text-gray-500">{edu.degree}</p>
              <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Projects */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">🚀 Projects</h2>
        <div className="space-y-6">
          {projects.map((proj: ProjectItem) => (
            <div key={proj.id}>
              <h3 className="text-lg font-bold">{proj.name}</h3>

              {/* Tag Badges */}
              {proj.stack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {proj.stack.map((tag) => (
                    <span
                      key={tag.name}
                      className={`inline-block text-xs font-semibold px-2 py-1 rounded-bl-lg shadow-md ${
                        notionColorMap[tag.color] || notionColorMap.default
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <p className="mt-2">{proj.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
