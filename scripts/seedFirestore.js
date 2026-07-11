/**
 * scripts/seedFirestore.js
 *
 * One-time migration: pushes your current site content (scripts/seedData.json)
 * into Firestore, so the admin panel starts out showing your real
 * photos/skills/achievements/certificates/projects instead of an empty list.
 *
 * SAFE TO RE-RUN: it only ever ADDS documents, it never deletes anything.
 * If you run it twice you'll get duplicates - if that happens, just delete
 * the extras from the admin panel.
 *
 * SETUP (one time):
 *   1. Firebase Console -> Project settings -> Service accounts
 *      -> "Generate new private key" -> downloads a JSON file.
 *   2. Save that file as scripts/serviceAccountKey.json
 *      (this file is gitignored - NEVER commit it, it's an admin credential)
 *   3. From the project root:
 *        cd scripts
 *        npm install firebase-admin
 *        node seedFirestore.js
 */

const admin = require("firebase-admin");
const path = require("path");
const seedData = require("./seedData.json");

let serviceAccount;
try {
  serviceAccount = require("./serviceAccountKey.json");
} catch (e) {
  console.error(
    "\nCouldn't find scripts/serviceAccountKey.json.\n" +
      "Download it from Firebase Console -> Project settings -> Service accounts " +
      "-> Generate new private key, and save it at that exact path.\n"
  );
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function seedCollection(name, docs) {
  if (!docs || docs.length === 0) {
    console.log(`- Skipping "${name}" (no seed data)`);
    return;
  }
  const batch = db.batch();
  docs.forEach((docData) => {
    const ref = db.collection(name).doc(); // auto-generated ID
    batch.set(ref, docData);
  });
  await batch.commit();
  console.log(`✓ Seeded ${docs.length} document(s) into "${name}"`);
}

async function main() {
  console.log(`Seeding Firestore project: ${serviceAccount.project_id}\n`);

  await seedCollection("heroImages", seedData.heroImages);
  await seedCollection("skills", seedData.skills);
  await seedCollection("achievements", seedData.achievements);
  await seedCollection("certificates", seedData.certificates);
  await seedCollection("projects", seedData.projects);
  await seedCollection("clubRoles", seedData.clubRoles);

  console.log("\nDone. Check the Firestore console or your admin panel to confirm.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
