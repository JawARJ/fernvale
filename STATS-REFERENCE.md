# Stat and recovery rules — 0.70

Effective STR/DEX/INT/LUK include eligible selected support effects and equipment Options.

| Contribution | Rule |
| --- | --- |
| DEX → ATKSPD | +floor(DEX / 4), added to base 100; existing overall ATKSPD cap 190 remains |
| DEX → ACC | Removed; ACC remains 90 + INT plus equipment/support bonuses |
| STR → HP regen | +STR / 50 HP per second |
| INT → MP regen | +INT / 100 MP per second |
| Field base HP regen | 0.2 HP/s |
| Town base HP regen | 2 HP/s |
| Field base MP regen | 0.1 MP/s (previously 2) |
| Town base MP regen | 0.5 MP/s (previously 5) |

Existing percentage-of-max-MP support recovery is added separately, without multiplying the new absolute INT recovery. Recovery ticks only while gameplay runs and caps at maximum HP/MP. Potions and mana steal retain their own rules.

Status page 1 contains HP/MP/ATK/ATKSPD/DEF/CRI/CRI.DAMAGE/ACC/AVOID/SPD/JUMP. Page 2 (Bonus Stat) contains HP regen/s, MP regen/s, damage%, boss damage%, damage reduction%, ignore defense%. Recovery values show the current map's actual rate. Damage reduction includes eligible conditional reduction at the current HP and is applied after DEF, with a 90% cap. Shields and invulnerability remain separate mechanics.

The formula changes retain existing character stats, AP, skill ranks, items and save compatibility. All other base-stat contributions remain as before.
