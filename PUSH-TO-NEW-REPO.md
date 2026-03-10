# Push This Codebase to a Different Repo (Without Affecting the Original)

Your current **origin** points to `Steora/Sue-Loney-ACT-Website`. These steps let you push your changes to another repo and optionally rename the project, without ever pushing to the original repo.

---

## 1. Add your other repo as a second remote

Create a **new** remote (don’t replace `origin`). Use your other repo’s URL.

```powershell
# Replace with your other repo URL (HTTPS or SSH)
git remote add newrepo https://github.com/YOUR_USERNAME/YOUR_OTHER_REPO.git
```

Or with SSH:

```powershell
git remote add newrepo git@github.com:YOUR_USERNAME/YOUR_OTHER_REPO.git
```

Check remotes:

```powershell
git remote -v
```

You should see:

- **origin** → Sue-Loney-ACT-Website (leave this as-is; don’t push here)
- **newrepo** → your other repo (push here)

---

## 2. (Optional) Rename the project

If you want a different **project name** (e.g. in `package.json` and README):

- Edit **`package.json`** → change the `"name"` field (e.g. to `"my-new-project"`).
- Edit **`README.md`** → change the title and any references to the old name.

If you meant renaming **files or folders**, do that in the file explorer or with `git mv`.

---

## 3. Commit any changes

If you modified files (including renames):

```powershell
git add .
git commit -m "Your message"
```

---

## 4. Push only to the new repo

Push your branch (e.g. `main`) to the **new** remote only:

```powershell
git push newrepo main
```

To set the new repo as the default push target for this branch:

```powershell
git push -u newrepo main
```

After that you can use:

```powershell
git push
```

and it will push to **newrepo**, not origin.

---

## Summary

| Goal                         | Command / action                          |
|-----------------------------|-------------------------------------------|
| Keep original repo untouched| Never run `git push origin`               |
| Push to your other repo     | `git push newrepo main` (or `git push` after `-u`) |
| Rename project              | Edit `package.json` and `README.md`       |
| See remotes                 | `git remote -v`                           |

Your GitHub repo **Steora/Sue-Loney-ACT-Website** is only updated when you explicitly run `git push origin`. Using a second remote and pushing only to it keeps the original repo unchanged.
