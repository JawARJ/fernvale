# Swordsman skill adaptation — Fernvale0.32

Concept source: Nexon official Explorer Warrior skill guide https://gi.maplestory.nexon.com/Guide/GameInformation/Skill/Warrior (checked2026-10-13). This implementation uses six first-job concepts and listed max levels; it is a Fernvale adaptation, not a claim of exact current MapleStory patch values. Art/animation and tuning implemented locally.

|Skill|Max|Fernvale effect|
|---|---:|---|
|Warrior Mastery|15|Per rank speed+3%, jump impulse+2%, HP+1%, knockback resistance+2%|
|Iron Body|20|Passive per rank HP+2%, DEF+1, incoming damage mitigation+0.5%|
|Slash Blast|20|110–205%ATK,6targets, MP6+floor(rank/5), forward sweep|
|Warrior Leap|10|MP4, once per airborne cycle, horizontal velocity240+14rank for0.22s, upward impulse260; Space repeat or assigned slot|
|Upper Charge|5|130–170%ATK,4targets, MP7, upward impulse410+24rank; once per airborne cycle; Up+C or assigned slot|
|Leap Attack|1|180%ATK,6targets, MP5, dive onto nearest platform below; damage on landing; Down+C or assigned slot|

No timed skill cooldowns; movement has ground/air conditions and one-air-use limits. Invalid casts do not consumeMP. Q/W/E/R manual assignments remain. Ordinary C attack stays one target.

Migration: old Slash ranks→Slash Blast; old HP Boost + DEF Boost ranks→Iron Body; removed Power Bash ranks refunded as SP. Old Slash bindings remap; Power Bash bindings cleared. New skillVersion2 is saved; migration does not repeat or duplicate points.
