const bulkButtons = () => {
  const isObjectsTab = /[?&]tab=objects\b/.test(location.search);
  const toolbar = document.querySelector<HTMLDivElement>(
    'div[data-testid="object-list-table-action-buttons"]',
  );
  const existingDownload = document.getElementById("bulk-download-btn");

  const awsDownLoadButton = document.querySelector<HTMLButtonElement>(
    "#download-object-button",
  );

  const configs = [
    {
      existing: existingDownload,
      awsButton: awsDownLoadButton,
      id: "bulk-download-btn",
      text: "一括ダウンロード",
    },
  ];

  configs.forEach(({ existing, awsButton, id, text }) => {
    if (isObjectsTab && toolbar && awsButton) {
      if (!existing) {
        const btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        btn.className =
          "copy-button copy-object-url-button awsui_button_vjswe_1379u_157 awsui_variant-normal_vjswe_1379u_205";
        btn.style.marginLeft = "6px";
        btn.addEventListener("click", () => onClickBulkProcess(awsButton));
        toolbar.appendChild(btn);
      }
    } else if (existing) {
      existing.remove();
    }
  });

  updateBulkButtonsDisabledState();
};

const onClickBulkProcess = async (button: HTMLButtonElement) => {
  const allCheckboxes = getCurrentCheckBoxStatus();
  const preCheckBoxStatus = allCheckboxes.map((item) => item.checked);

  allCheckboxes.forEach((cb) => {
    if (cb.checked) cb.click();
  });

  for (let i = 0; i < allCheckboxes.length; i++) {
    if (!preCheckBoxStatus[i]) continue;
    allCheckboxes[i].click();
    button.click();
    await new Promise((r) => setTimeout(r, 200));
    allCheckboxes[i].click();
  }

  for (let i = 0; i < allCheckboxes.length; i++) {
    if (preCheckBoxStatus[i]) {
      allCheckboxes[i].click();
    }
  }
};

const updateBulkButtonsDisabledState = () => {
  const anyChecked = getCurrentCheckBoxStatus().some((cb) => cb.checked);
  ["bulk-download-btn"].forEach((id) => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.classList.toggle("awsui_disabled_vjswe_1379u_223", !anyChecked);
    }
  });
};

const getCurrentCheckBoxStatus = (): HTMLInputElement[] =>
  Array.from(
    document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"][class^="awsui_native-input"]',
    ),
  );

const observer = new MutationObserver(() => {
  bulkButtons();
});

observer.observe(document.body, { childList: true, subtree: true });

bulkButtons();
