(() => {
  // Fixed example observations from the P Score V1.1 rules. No live model call.
  const examples = [
    {
      labels: ["Young 青年", "短袖上装、长裤 · 单层", "本人推婴儿车", "couple · 两人近距离照护", "站立", "照护互动"],
      deductions: [0, 4, 9, 3, 3],
      reason: "轻薄短上装配长下装扣 4 分。推婴儿车扣 9 分，双人近距离照护扣 3 分，两项同时出现额外扣 3 分。"
    },
    {
      labels: ["Young 青年", "短袖上装、短裤 · 单层轻薄", "手机 · 小型物品", "single · 未见明确结伴", "坐姿、低头", "独自看手机"],
      deductions: [0, 0, 2, 0, 0],
      reason: "轻薄短装对应 0 分，手机作为小型物品扣 2 分。低头和独处保留为行为标签。"
    },
    {
      labels: ["Older 老年", "长袖上装、长裤 · 单层普通厚度", "本人使用拐杖", "single · 未见明确结伴", "站立、拄杖", "独自停留"],
      deductions: [16, 10, 13, 0, 8],
      reason: "外观年龄档扣 16 分，长袖长裤扣 10 分，拐杖扣 13 分；老人本人用拐杖额外扣 8 分。"
    }
  ];
  const fields = ["Age 外观年龄", "Clothing 上装与下装", "Objects 随行物", "Companionship 结伴", "Posture 姿态", "Social state 社交状态"];
  const buttons = [...document.querySelectorAll("[data-case]")];
  const result = document.querySelector("#scoreResult");
  function show(index) {
    const {labels, deductions, reason} = examples[index];
    const score = Math.max(0, Math.min(100, 100 - deductions.reduce((total, value) => total + value, 0)));
    buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
    result.innerHTML = `<h3>01 · Vision-language labels 大模型标签</h3>
      <dl>${fields.map((field, i) => `<div><dt>${field}</dt><dd>${labels[i]}</dd></div>`).join("")}</dl>
      <h3>02 · Rule calculation 程序算分</h3>
      <div class="score-equation"><strong>P ${score.toFixed(2)}</strong><span>100 − A(${deductions[0]}) − C(${deductions[1]}) − O(${deductions[2]}) − D(${deductions[3]}) − I(${deductions[4]})</span></div>
      <p class="small">${reason}</p>
      <p class="small muted">预设案例 · P Score V1.1-integrated-r2。姿态与社交状态不独立扣分。P 用于服务排序，未经过热舒适实测标定。</p>`;
  }
  buttons.forEach((button, index) => button.addEventListener("click", () => show(index)));
  show(0);
  document.querySelector("#pageBack").onclick = () => HW_DECK.go(HW_DECK.cur() - 1);
  document.querySelector("#pageNext").onclick = () => HW_DECK.go(HW_DECK.cur() + 1);
})();
