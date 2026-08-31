THUNDERBOLT is a standalone HTML/CSS/JavaScript single-page electric supercar launch portfolio. It presents four navigable chapters—Exterior, Performance, Interior, and Technology—with an aggressive, cinematic visual system and responsive mobile navigation. The rendered page does not require React.
3. “Request a drive” opens a validated dialog. Submission posts to `POST /api/inquiries`, persists the lead, closes the dialog, and shows a success toast.

## Static source files

- `frontend/index.html` contains the complete page structure.
- `frontend/public/thunderbolt.css` contains the responsive visual system, layout, and animations/transitions.
- `frontend/public/thunderbolt.js` contains navigation, detail selection, modal form behavior, validation, and API submission.
