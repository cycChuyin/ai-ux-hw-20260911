const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace("import { Prototype } from './pages/Prototype';", "// import { Prototype } from './pages/Prototype';");
app = app.replace("{activeTab === 'prototype' && <Prototype onNavigateTab={handleSelectTab} />}", "{activeTab === 'prototype' && <div>Prototype</div>}");
fs.writeFileSync('src/App.tsx', app);
