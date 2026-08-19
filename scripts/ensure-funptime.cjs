/**
 * 안심강아지장례식장(funptime / funeral.puppytimes.co.kr) 전용 배포 가드
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const vercelPath = path.join(root, ".vercel", "project.json");

function fail(msg) {
  console.error("\n❌ 배포 중단 — " + msg);
  console.error("이 프로젝트는 funptime / funeral.puppytimes.co.kr 전용입니다.\n");
  process.exit(1);
}

if (fs.existsSync(vercelPath)) {
  const vercel = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
  if (vercel.projectName && !/funptime|puppytimes|funeral/i.test(vercel.projectName)) {
    fail(`Vercel 연결이 '${vercel.projectName}' 입니다. funptime 계열 프로젝트만 허용됩니다.`);
  }
}

let remote = "";
try {
  remote = execSync("git remote get-url origin", { cwd: root, encoding: "utf8" }).trim();
} catch {
  /* origin 없음 */
}

if (remote && !/funptime|puppytimes/i.test(remote)) {
  fail(`git origin이 funptime 전용이 아닙니다:\n  ${remote}`);
}

console.log("✅ 배포 대상 확인: 안심강아지장례식장 (funptime / funeral.puppytimes.co.kr)");
