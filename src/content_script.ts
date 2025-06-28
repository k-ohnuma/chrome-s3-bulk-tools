const bulkButtons = () => {
  const isObjectsTab = /[?&]tab=objects\b/.test(location.search);
  const toolbar = document.querySelector<HTMLDivElement>(
    'div[data-testid="object-list-table-action-buttons"]',
  );
  const existingDownload = document.getElementById("bulk-download-btn");
  const existingOpen = document.getElementById("bulk-open-btn");

  const awsDownLoadButton = document.querySelector<HTMLButtonElement>("#download-object-button");  
  if (isObjectsTab && toolbar && awsDownLoadButton) {
    if (!existingDownload) {
      const btn = document.createElement("button");
      btn.id = "bulk-download-btn";
      btn.textContent = "一括ダウンロード";
      btn.className = "awsui_button awsui_button_primary";
      btn.style.marginLeft = "6px";
      btn.addEventListener("click", () => onClickBulkDownload(awsDownLoadButton));
      toolbar.appendChild(btn);
    }
  } else {
    if (existingDownload) {
      existingDownload.remove();
    }
  }
  const buttonConfigs = [
    // {
    //   id: "bulk-download-btn",
    //   text: "一括ダウンロード",
    //   onClick: onClickBulkDownload,
    // },
    {
      id: "bulk-open-btn",
      text: "一括で開く",
      onClick: () => console.log("一括で開く clicked"),
    },
  ];

  buttonConfigs.forEach(({ id, text, onClick }) => {
    const existing = document.getElementById(id);
    if (isObjectsTab && toolbar) {
      if (!existing) {
        const btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        btn.className = "awsui_button awsui_button_primary";
        btn.style.marginLeft = "6px";
        btn.addEventListener("click", onClick);
        toolbar.appendChild(btn);
      }
    } else {
      if (existing) {
        existing.remove();
      }
    }
  });
};

const onClickBulkDownload = async (downLoadButton: HTMLButtonElement) => {
  const allCheckboxes = getCurrentCheckBoxStatus();
  const preCheckBoxStatus = allCheckboxes.map((item) => item.checked);
  allCheckboxes.forEach((cb) => {
    if (cb.checked) {
      cb.click();
    }
  });

  for (let i = 0; i < allCheckboxes.length; i++) {
    if (!preCheckBoxStatus[i]) {
      continue;
    }
    allCheckboxes[i].click();
    downLoadButton.click();
    await new Promise((r) => setTimeout(r, 500));

    allCheckboxes[i].click();
  }

  for (let i = 0; i < allCheckboxes.length; i++) {
    if (!preCheckBoxStatus[i]) {
      continue;
    }
    allCheckboxes[i].click();
  }
};

const getCurrentCheckBoxStatus = (): HTMLInputElement[] => {
  return Array.from(
    document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"][class^="awsui_native-input"]',
    ),
  );
};
const observer = new MutationObserver((mutations) => {
  bulkButtons();
});

observer.observe(document.body, { childList: true, subtree: true });

bulkButtons();
