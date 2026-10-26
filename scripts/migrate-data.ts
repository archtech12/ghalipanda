import mongoose from 'mongoose';
import { projects } from '../lib/projects';
import { news } from '../lib/news';
import Project from '../server/models/Project';

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  imageUrl: String,
  publishDate: Date,
  excerpt: String
}, { timestamps: true });

const News = mongoose.models.News || mongoose.model('News', newsSchema);

const aboutSchema = new mongoose.Schema({
  title: String,
  content: String,
  quickFacts: [{
    icon: String,
    label: String,
    value: String
  }],
  updatedAt: { type: Date, default: Date.now },
});
const About = mongoose.models.About || mongoose.model('About', aboutSchema);

const MONGODB_URI = 'mongodb://127.0.0.1:27017/ghali-panda-dashboard';

async function migrate() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    console.log('Clearing old projects...');
    await Project.deleteMany({});
    console.log('Inserting projects from lib/projects.ts...');
    
    // Map projects to match schema (remove _id to let mongo generate it)
    const projectsToInsert = projects.map(p => {
      const { _id, ...rest } = p;
      return rest;
    });
    await Project.insertMany(projectsToInsert);
    console.log(`Inserted ${projectsToInsert.length} projects.`);

    console.log('Clearing old news...');
    await News.deleteMany({});
    console.log('Inserting news from lib/news.ts...');
    const newsToInsert = news.map(n => {
      const { _id, ...rest } = n;
      return rest;
    });
    await News.insertMany(newsToInsert);
    console.log(`Inserted ${newsToInsert.length} news articles.`);

    console.log('Upserting About Data...');
    await About.findOneAndUpdate(
      {},
      {
        title: 'About Hon. Dr. Ghali Mustapha Tijjani Panda',
        content: `<p>Hon. Dr. Ghali Mustapha Tijjani Panda is the distinguished Member representing the Gaya, Ajingi, and Albasu Federal Constituency in the Federal House of Representatives under the platform of the All Progressives Congress (APC).</p>
            <p>A visionary leader, grassroots mobilizer, and dedicated public servant, Dr. Ghali Panda has dedicated his tenure to transforming lives across Gaya, Ajingi, and Albasu through massive investments in clean water, rural electrification, healthcare infrastructure, educational empowerment, and agricultural revitalization.</p>
            <p>Since his inauguration in 2023, he has distinguished himself on the floor of the House with people-first motions and bills, while executing dozens of verifiable community development projects across Gaya Town, Kademi, Panda, Albasu, Ajingi, Faragai, Toranke, Gafasa, and surrounding wards.</p>`,
        quickFacts: [
          { icon: 'badge', label: 'Position', value: 'Member, House of Representatives' },
          { icon: 'location_on', label: 'Constituency', value: 'Gaya, Ajingi, and Albasu Federal Constituency' },
          { icon: 'calendar_today', label: 'Years of Service', value: '2023 - Present' },
          { icon: 'groups', label: 'Party', value: 'All Progressives Congress (APC)' },
          { icon: 'school', label: 'Education', value: 'Doctoral Studies, Public Administration & Governance' },
        ]
      },
      { upsert: true, new: true }
    );
    console.log('About data inserted.');

    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
