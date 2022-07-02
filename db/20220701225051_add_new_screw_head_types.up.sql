BEGIN
;

ALTER TYPE screw_head_t ADD VALUE IF NOT EXISTS 'oval'
;

ALTER TYPE screw_head_drive_t ADD VALUE IF NOT EXISTS 'slotted' after 'phillips'
;

ALTER TYPE bolt_head_t ADD VALUE IF NOT EXISTS 'tnut'
;

COMMIT
;
