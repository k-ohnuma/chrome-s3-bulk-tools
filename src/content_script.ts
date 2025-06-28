const bulkButtons = () =>  {
  const isObjectsTab = /[?&]tab=objects\b/.test(location.search);
  const toolbar = document.querySelector<HTMLDivElement>('div[data-testid="object-list-table-action-buttons"]');
  const existingDownload = document.getElementById('bulk-download-btn');
  const existingOpen = document.getElementById('bulk-open-btn');

  const buttonConfigs = [
    {
      id: "bulk-download-btn",
      text: "一括ダウンロード",
      onClick: () => console.log("一括ダウンロード clicked"),
    },
    {
      id: "bulk-open-btn",
      text: "一括で開く",
      onClick: () => console.log("一括で開く clicked"),
    },
  ];

  buttonConfigs.forEach(({id, text, onClick}) => {
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
  })
}

const observer = new MutationObserver((mutations) => {
  bulkButtons();
});

observer.observe(document.body, { childList: true, subtree: true });

bulkButtons();
