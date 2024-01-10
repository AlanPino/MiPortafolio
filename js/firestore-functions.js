import { getFirestore, doc, setDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';
import app from "../firebase/firebase-config.js";
import Project from './models/project-model.js';
import Mail from './models/mail-model.js';

const db = getFirestore(app);

const getProjects = async () => {
    try {
        const projects = [];
        const querySnapshot = await getDocs(collection(db, "Projects"));

        for (const doc of querySnapshot.docs) {
            const screenshots = [];

            const screenshotsSnapshot = await getDocs(collection(doc.ref, "Screenshots"));

            if (!screenshotsSnapshot.empty) {
                screenshotsSnapshot.forEach(screenshot => {
                    screenshots.push(screenshot.get("url"));
                });
            }

            projects.push(new Project(
                doc.get("title"),
                doc.get("icon"),
                doc.get("content"),
                doc.get("image"),
                doc.get("language"),
                doc.get("repository"),
                screenshots,
                doc.get("app")
            ));
        }

        return projects;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        return [];
    }
};

const sendMail = async (mail) => {
    try {
        await setDoc(doc(db, "Mails", mail.email), {
            "name": mail.name,
            "email": mail.email,
            "subject": mail.subject,
            "message": mail.message
        });

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
};

export { getProjects, sendMail };