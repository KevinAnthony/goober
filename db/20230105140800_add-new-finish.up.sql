BEGIN
;

ALTER TYPE material_finish_t ADD VALUE IF NOT EXISTS 'brass' AFTER 'black_oxide'
;

END
;
