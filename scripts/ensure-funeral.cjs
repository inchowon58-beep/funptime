/**
 * 강아지장례정보센터(funeral) 전용 배포 가드
 * 다른 프로젝트(cloudshelter, jejumilgam 등)와 섞이지 않도록 합니다.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const vercelPath = path.join(root, ".vercel", "project.json");

function fail(msg) {
  console.error("\n❌ 배포 중단 — " + msg);
  console.error("이 프로젝트는 funeral(강아지장례정보센터) 전용입니다.");
  console.error("다른 사이트와 섞여 push/deploy 하지 마세요.\n");
  process.exit(1);
}

if (fs.existsSync(vercelPath)) {
  const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
  if (vercel.projectName && !/funeral/i.test(vercel.projectName)) {
    fail(
      `Vercel 연결이 '${vercel.projectName}' 입니다. funeral 프로젝트만 허용됩니다.\n` +
        `해결: npx vercel link --project funeral --yes`
    );
  }
}

let remote = "";
try {
  remote = execSync("git remote get-url origin", { cwd: root, encoding: "utf8" }).trim();
} catch {
  /* origin 없음 — 로컬 제작 단계 */
}

if (remote) {
  if (/cloudshelter|jejumilgam|dogboho|구름이네/i.test(remote)) {
    fail(`git origin이 funeral 전용이 아닙니다:\n  ${remote}`);
  }
  if (!/funeral/i.test(remote)) {
    console.warn(`⚠️  git origin에 'funeral'이 없습니다: ${remote}`);
  }
}

console.log("✅ 배포 대상 확인: 강아지장례정보센터 (funeral)");
