BEGIN
;

ALTER TYPE bolt_head_t ADD VALUE IF NOT EXISTS 'flange'
;

ALTER TYPE bolt_head_t ADD VALUE IF NOT EXISTS 'carriage'
;

ALTER TYPE nut_t ADD VALUE IF NOT EXISTS 'coupling'
;

ALTER TABLE nut ALTER COLUMN description DROP NOT NULL
;

ALTER TABLE nail ALTER COLUMN description DROP NOT NULL
;

ALTER TABLE screw ADD COLUMN description TEXT
;

ALTER TABLE bolt ADD COLUMN description TEXT
;

ALTER TABLE washer ADD COLUMN description TEXT
;

COMMIT
;
