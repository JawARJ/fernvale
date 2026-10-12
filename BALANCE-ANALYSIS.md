# Combat audit, 0.21 (no balance changes)
Actual screenshot: Lv10 STR45 DEX5, ATK166, HP907, DEF40. Formula round(17*(4*STR+DEX)/20 + level-1). Every STR adds about 3.4 ATK, DEX about 0.85; five AP/level. All AP into STR produces ATK21/93/183/363/543 at Lv1/5/10/20/30.

Stage levels 1/10/20/30 have normal HP24/55/80/110, ATK6/12/16/20, no assigned DEF. Damage variance 90–110%, 6% critical in screenshot. ATK166 normal hits 149–183; Power Bash Lv1 about 374–457 before critical, 415 nominal. Stage10 elite HP275 also dies in one Bash. Normal attack has no target count cap, and skills no cooldown per user design.

Enemy contact damage max(1, round(enemyATK-playerDEF)), contact invulnerability 1.2 seconds. DEF40 floors all normal and elite contact to 1 (Stage30 elite ATK40). HP907 with HP Boost40% cannot be meaningfully threatened.

Proposed starting tuning (requires playtests, not implemented): target normal attacks 2–4 hits at appropriate stage level; HP about250/650/1100 for Stage10/20/30, keep Stage0 forgiving. These give roughly2/2/3 noncritical normal hits for full STR appropriate-level builds, preserve one-hit high-multiplier Bash, and keep Slash useful for mobs. Consider replacing subtractive DEF with proportional mitigation ATK*100/(100+DEF); retune enemy ATK after selecting desired survival time. Preserve 4:1 main/secondary contribution. Only reconsider the overall weapon formula after monster scaling and defense have been tested.
