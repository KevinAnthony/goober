BEGIN
;

ALTER TYPE content_t ADD VALUE IF NOT EXISTS 'nail' BEFORE 'simple'
;

ALTER TYPE material_finish_t ADD VALUE IF NOT EXISTS 'black_phosphate'
;

ALTER TYPE material_finish_t ADD VALUE IF NOT EXISTS 'bright'
;

CREATE TABLE IF NOT EXISTS nail
(
    id UUID NOT NULL
        CONSTRAINT nail_pk
            PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL,
    CONSTRAINT nail_to_content_fk
        FOREIGN KEY(content_id)
            REFERENCES content(id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    description TEXT NOT NULL,
    gauge TEXT NOT NULL,
    length FLOAT NOT NULL,
    material material_finish_t NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);
