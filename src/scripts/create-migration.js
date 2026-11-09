
import fs from "fs";
import path from "path";

const migrationName = process.argv[2];

if (!migrationName) {
    console.error("Please provide a migration name.");
    console.log("Example: npm run db:migration:create -- create-courses");
    process.exit(1);
}

const timestamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);

const fileName = `${timestamp}-${migrationName}.js`;

const filePath = path.resolve("src/migrations", fileName);

const template = `export async function up({ context: queryInterface }) {
    // Write migration logic here
}

export async function down({ context: queryInterface }) {
    // Write rollback logic here
}
`;

fs.mkdirSync(path.dirname(filePath), { recursive: true });

fs.writeFileSync(filePath, template);

console.log(`Migration created: ${fileName}`);
