# Current catalog · release 0.63

48 Active + 128 Buff/Passive. Support definitions: `dist/supportdata.js`, runtime: `dist/support.js`, UI: `dist/support-ui.js`. See [full support reference](BUFF-PASSIVE-REFERENCE.md). The following Active rules continue to apply.

# Active skills · release 0.60

The live catalog is `dist/skilldata.js` (48 Active skills, 12 weapons × 4 tiers).
The combat implementation is `dist/skilldesign.js`; selection and descriptions are in `dist/skillpicker.js`.

- Damage per target: tier 1/2/3/4 = 100/120/150/200% ATK, divided across hits. Rank does not increase damage.
- Continuous damage, poison, summons and extra damage use the total per round; summoned mini fields retain their specified 34% modifier.
- MP: tier × (skill rank + 5). Rank 1 costs 6/12/18/24; rank 30 costs 35/70/105/140.
- Toggles pay the tier 4 formula on activation and each second. Insufficient MP turns them off.
- Charged skills show their maximum tier damage. Staff blast scales 60→120%, staff bind 25→150%, snipe 75→150%, spear 100→200%; hammer charge levels deal 50/100/150%. Staff/crossbow/spear scale continuously with charge; hammer uses complete 1/2/3-second levels.
- Spear tier 3 gains one hit at ATKSPD 130, 160 and 190; the total stays 150%.
- Sword giant chooses the enemy nearest the point 400 ahead anywhere in the map, with a total width of 180 across all platforms.
- Buff and Passive catalogs, effects, scrolls and hotbars from previous releases are removed. Active self buffs and toggles in the new design remain Active skills.
- Skill save schema v4 retires all old skill ranks, scrolls and bindings. All new skills start at rank 1, as before; new rank upgrades and scrolls survive subsequent v4 reloads. Levels, stats, money, gear and boxes remain. Old claw equipment becomes fist equipment.
- Skill tiers 2/3/4 unlock at level 30/60/100 after defeating the respective boss and using its advancement mark.

## Cooldowns (seconds)

| Weapon | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---:|---:|---:|---:|
| Dagger | 0.5 | 5 | 5 | 8 |
| Star | 0.5 | 3 | 10 | 15 |
| Fist | 1 | 2 | 3 | 15 |
| Wand | 0.5 | 2 | 3 | Toggle |
| Staff | 1 | 3 | 8 | 12 |
| Tome | 1 | 10 | 10 | 15 |
| Bow | 1 | 2 | 25 | 8 |
| Crossbow | 2 | 1 | 5 | 5 |
| Gun | 0.5 | 1 | 5 | 5 |
| Sword | 0.5 | 3 | 10 | 12 |
| Spear | 1 | 2 | 1 | 7 |
| Hammer | 1.5 | 0.5 | 8 | Toggle |

Staff charged cooldowns begin on release. Sword spin cooldown begins on stopping. Crossbow tiers 1–3 reduce the cooldown by 1–45%, using ATKSPD at cast time. Dagger teleport searches radius 500 and attacks within 100 after teleport; kills reset its cooldown and boss hits use 75% (3.75 seconds).
