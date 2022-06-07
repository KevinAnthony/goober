BEGIN
;

ALTER TYPE content_t ADD VALUE IF NOT EXISTS 'empty' BEFORE 'bolt'
;

ALTER TYPE content_t ADD VALUE IF NOT EXISTS 'simple' BEFORE 'bolt'
;

CREATE TABLE IF NOT EXISTS simple
(
    id UUID NOT NULL
        CONSTRAINT simple_pk
            PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL,
    CONSTRAINT simple_to_content_fk
        FOREIGN KEY(content_id)
            REFERENCES content(id)
            ON UPDATE CASCADE ON DELETE CASCADE,
    string text NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

COMMIT
;
