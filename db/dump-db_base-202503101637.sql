PGDMP         %        
        }            db_base    10.23    15.10 (Debian 15.10-0+deb12u1) 1    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    219314    db_base    DATABASE     s   CREATE DATABASE db_base WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE db_base;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    8            �           0    0    SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    8            �            1259    219354    cartas_resoluciones    TABLE     �  CREATE TABLE public.cartas_resoluciones (
    id integer NOT NULL,
    rc_inten character varying(5) NOT NULL,
    rc_tipo character varying(2) NOT NULL,
    rc_numero character varying(4) NOT NULL,
    rc_year integer NOT NULL,
    rc_alfa character varying(1) DEFAULT ''::character varying NOT NULL,
    rc_fecha timestamp without time zone NOT NULL,
    rc_titulo text NOT NULL,
    rc_comentarios text NOT NULL,
    rc_filesize double precision DEFAULT '0'::double precision NOT NULL,
    rc_filename character varying(100) DEFAULT ''::character varying,
    rc_mercado character varying(3),
    rc_subtipo character varying(5) DEFAULT ''::character varying,
    rc_publicar_web boolean DEFAULT true NOT NULL,
    rc_categoria_documentos character varying DEFAULT 'publico'::character varying NOT NULL,
    id_seguimiento integer DEFAULT 0 NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    usuario_creacion character varying(50) DEFAULT 'Admin'::character varying NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now() NOT NULL,
    usuario_modificacion character varying(50) DEFAULT 'Admin'::character varying NOT NULL,
    fecha_modificacion timestamp without time zone DEFAULT now() NOT NULL
);
 '   DROP TABLE public.cartas_resoluciones;
       public            postgres    false    8            �            1259    219352    cartas_resoluciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cartas_resoluciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.cartas_resoluciones_id_seq;
       public          postgres    false    204    8            �           0    0    cartas_resoluciones_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.cartas_resoluciones_id_seq OWNED BY public.cartas_resoluciones.id;
          public          postgres    false    203            �            1259    219317 	   catalogos    TABLE     �   CREATE TABLE public.catalogos (
    id integer NOT NULL,
    cod_tab character varying(3) NOT NULL,
    cod_ele character varying(5) NOT NULL,
    descrip character varying(100) NOT NULL,
    cod_superior character varying(3)
);
    DROP TABLE public.catalogos;
       public            postgres    false    8            �            1259    219315    catalogos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.catalogos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.catalogos_id_seq;
       public          postgres    false    8    198            �           0    0    catalogos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.catalogos_id_seq OWNED BY public.catalogos.id;
          public          postgres    false    197            �            1259    219325    notificaciones    TABLE     �  CREATE TABLE public.notificaciones (
    id integer NOT NULL,
    rc_id integer NOT NULL,
    t_ciudad character varying(3) NOT NULL,
    t_fecha timestamp without time zone NOT NULL,
    t_hora character varying(5) NOT NULL,
    t_aquien character varying(254) NOT NULL,
    t_atraves character varying(254) NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    usuario_creacion character varying(50) DEFAULT 'Admin'::character varying NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now() NOT NULL,
    usuario_modificacion character varying(50) DEFAULT 'Admin'::character varying NOT NULL,
    fecha_modificacion timestamp without time zone DEFAULT now() NOT NULL
);
 "   DROP TABLE public.notificaciones;
       public            postgres    false    8            �            1259    219323    notificaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notificaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.notificaciones_id_seq;
       public          postgres    false    8    200            �           0    0    notificaciones_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.notificaciones_id_seq OWNED BY public.notificaciones.id;
          public          postgres    false    199            �            1259    219394    notificados    TABLE     �  CREATE TABLE public.notificados (
    id integer NOT NULL,
    descripcion character varying(254) NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    usuario_creacion character varying(50) DEFAULT 'Admin'::character varying NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now() NOT NULL,
    usuario_modificacion character varying(50) DEFAULT 'Admin'::character varying NOT NULL,
    fecha_modificacion timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.notificados;
       public            postgres    false    8            �            1259    219392    notificados_id_seq    SEQUENCE     �   CREATE SEQUENCE public.notificados_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.notificados_id_seq;
       public          postgres    false    208    8            �           0    0    notificados_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.notificados_id_seq OWNED BY public.notificados.id;
          public          postgres    false    207            �            1259    219341    seguimiento    TABLE     �  CREATE TABLE public.seguimiento (
    id integer NOT NULL,
    id_documento integer NOT NULL,
    accion character varying(50) DEFAULT 'CREADO'::character varying NOT NULL,
    etapa character varying(50) DEFAULT 'CREADO'::character varying NOT NULL,
    observaciones character varying(50) DEFAULT ''::character varying NOT NULL,
    usuario character varying(50) DEFAULT 'Admin'::character varying NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.seguimiento;
       public            postgres    false    8            �            1259    219339    seguimiento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.seguimiento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.seguimiento_id_seq;
       public          postgres    false    202    8            �           0    0    seguimiento_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.seguimiento_id_seq OWNED BY public.seguimiento.id;
          public          postgres    false    201            �            1259    219377    usuarios    TABLE     l  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    role text NOT NULL,
    nombre_completo character varying(500),
    status character varying(10) DEFAULT 'ACTIVO'::character varying NOT NULL,
    estado boolean DEFAULT true NOT NULL,
    usuario_creacion character varying(50) DEFAULT 'SYSTEM'::character varying NOT NULL,
    fecha_creacion timestamp without time zone DEFAULT now() NOT NULL,
    usuario_modificacion character varying(50) DEFAULT 'SYSTEM'::character varying NOT NULL,
    fecha_modificacion timestamp without time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.usuarios;
       public            postgres    false    8            �            1259    219375    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    8    206            �           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    205                       2604    219357    cartas_resoluciones id    DEFAULT     �   ALTER TABLE ONLY public.cartas_resoluciones ALTER COLUMN id SET DEFAULT nextval('public.cartas_resoluciones_id_seq'::regclass);
 E   ALTER TABLE public.cartas_resoluciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    204    204            �           2604    219320    catalogos id    DEFAULT     l   ALTER TABLE ONLY public.catalogos ALTER COLUMN id SET DEFAULT nextval('public.catalogos_id_seq'::regclass);
 ;   ALTER TABLE public.catalogos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    198    197    198            �           2604    219328    notificaciones id    DEFAULT     v   ALTER TABLE ONLY public.notificaciones ALTER COLUMN id SET DEFAULT nextval('public.notificaciones_id_seq'::regclass);
 @   ALTER TABLE public.notificaciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    199    200                       2604    219397    notificados id    DEFAULT     p   ALTER TABLE ONLY public.notificados ALTER COLUMN id SET DEFAULT nextval('public.notificados_id_seq'::regclass);
 =   ALTER TABLE public.notificados ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207    208            �           2604    219344    seguimiento id    DEFAULT     p   ALTER TABLE ONLY public.seguimiento ALTER COLUMN id SET DEFAULT nextval('public.seguimiento_id_seq'::regclass);
 =   ALTER TABLE public.seguimiento ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    201    202                       2604    219380    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    205    206            �          0    219354    cartas_resoluciones 
   TABLE DATA           F  COPY public.cartas_resoluciones (id, rc_inten, rc_tipo, rc_numero, rc_year, rc_alfa, rc_fecha, rc_titulo, rc_comentarios, rc_filesize, rc_filename, rc_mercado, rc_subtipo, rc_publicar_web, rc_categoria_documentos, id_seguimiento, estado, usuario_creacion, fecha_creacion, usuario_modificacion, fecha_modificacion) FROM stdin;
    public          postgres    false    204   tB       �          0    219317 	   catalogos 
   TABLE DATA           P   COPY public.catalogos (id, cod_tab, cod_ele, descrip, cod_superior) FROM stdin;
    public          postgres    false    198   �C       �          0    219325    notificaciones 
   TABLE DATA           �   COPY public.notificaciones (id, rc_id, t_ciudad, t_fecha, t_hora, t_aquien, t_atraves, estado, usuario_creacion, fecha_creacion, usuario_modificacion, fecha_modificacion) FROM stdin;
    public          postgres    false    200   �E       �          0    219394    notificados 
   TABLE DATA           �   COPY public.notificados (id, descripcion, estado, usuario_creacion, fecha_creacion, usuario_modificacion, fecha_modificacion) FROM stdin;
    public          postgres    false    208   F       �          0    219341    seguimiento 
   TABLE DATA           n   COPY public.seguimiento (id, id_documento, accion, etapa, observaciones, usuario, fecha_creacion) FROM stdin;
    public          postgres    false    202   �F       �          0    219377    usuarios 
   TABLE DATA           �   COPY public.usuarios (id, username, role, nombre_completo, status, estado, usuario_creacion, fecha_creacion, usuario_modificacion, fecha_modificacion) FROM stdin;
    public          postgres    false    206   G       �           0    0    cartas_resoluciones_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.cartas_resoluciones_id_seq', 5, true);
          public          postgres    false    203            �           0    0    catalogos_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.catalogos_id_seq', 1, false);
          public          postgres    false    197            �           0    0    notificaciones_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.notificaciones_id_seq', 1, false);
          public          postgres    false    199            �           0    0    notificados_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.notificados_id_seq', 2, true);
          public          postgres    false    207            �           0    0    seguimiento_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.seguimiento_id_seq', 5, true);
          public          postgres    false    201            �           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 1, true);
          public          postgres    false    205                       2606    219322 (   catalogos PK_1d78e1f35ded834637978e7cbf2 
   CONSTRAINT     h   ALTER TABLE ONLY public.catalogos
    ADD CONSTRAINT "PK_1d78e1f35ded834637978e7cbf2" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.catalogos DROP CONSTRAINT "PK_1d78e1f35ded834637978e7cbf2";
       public            postgres    false    198            !           2606    219351 *   seguimiento PK_401601380fe4bfebc3cdc69b0e4 
   CONSTRAINT     j   ALTER TABLE ONLY public.seguimiento
    ADD CONSTRAINT "PK_401601380fe4bfebc3cdc69b0e4" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.seguimiento DROP CONSTRAINT "PK_401601380fe4bfebc3cdc69b0e4";
       public            postgres    false    202            #           2606    219374 2   cartas_resoluciones PK_7fa0528f34122c5278c81de6291 
   CONSTRAINT     r   ALTER TABLE ONLY public.cartas_resoluciones
    ADD CONSTRAINT "PK_7fa0528f34122c5278c81de6291" PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.cartas_resoluciones DROP CONSTRAINT "PK_7fa0528f34122c5278c81de6291";
       public            postgres    false    204                       2606    219338 -   notificaciones PK_a9d32a419ff58b53a38b5ef85d4 
   CONSTRAINT     m   ALTER TABLE ONLY public.notificaciones
    ADD CONSTRAINT "PK_a9d32a419ff58b53a38b5ef85d4" PRIMARY KEY (id);
 Y   ALTER TABLE ONLY public.notificaciones DROP CONSTRAINT "PK_a9d32a419ff58b53a38b5ef85d4";
       public            postgres    false    200            '           2606    219404 *   notificados PK_cdd32c3722560b66f0248197ac5 
   CONSTRAINT     j   ALTER TABLE ONLY public.notificados
    ADD CONSTRAINT "PK_cdd32c3722560b66f0248197ac5" PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.notificados DROP CONSTRAINT "PK_cdd32c3722560b66f0248197ac5";
       public            postgres    false    208            %           2606    219391 '   usuarios PK_d7281c63c176e152e4c531594a8 
   CONSTRAINT     g   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT "PK_d7281c63c176e152e4c531594a8";
       public            postgres    false    206            �   %  x���Mn�0���� �=?��B�M�]7i��!����B�6i%����i���6s�"Р����I�	�y�q;' `�\�z��+\n�U,j�ݻ��M�;��~ܚ�b@�5�4#����H�
���I����rB��
�rZX\F#�>�z���+�Cc�9ڲ:�U{<=MM�$�	�GA�F@���ƠGR���d;�e�I�k�&^����诨O��5ob=��?��Z�f���� ����%��}��~]����e��IL0�j��`��'��7���%U��      �   =  x��Sێ�0}6_�/hI���qL;(ؖ� ���jI*X^�����TuU��\&>㙂T`H���sP�V���rVÎE�<�ь8V�����KD��zGjO���ER�A���gz�_"n��X߽z��W�gc$�	��z�˒���^���1�,��k9"X �֌8>��/e��d�h�R�)b���l��]`&��@wh�o��+["U)N��W���V��zj���ȳ�76l�6 �:�lYh�d��0yr��uc���"���&l�'6̢d�$Z�G�6�:�+a�T�+��M<FrN���H�XM\m���P5K*6�1'dJWS^��N�v��0���
c���rCk*p� j'�Lٗ�`��e��&�\}Ѐ���s�Fo�����{�6z��5z�C�L���>�n��?X%t
y�Q�ڸ֊�Ŋ�ư���oT�0E�FL
�41�K|��aC3���o^ې�F.)yT��N{Uه����s{I�3G��w�����-�b������.�TSD�}Ci�Ȉ��L�Q[!*e��d��g�Sy�1*d#�!o�j��X"�I�W�q*�>�F�?`�7      �      x������ � �      �   `   x�}�;� �z�^@���C輇Mx[c?ЕS���P�RS��N+}k��m ^F�0��M��� �C��:��*���ހg��_�(      �   n   x���-APݞ�l3���OaW����,�?����zJJ��v]�'�����z�BA,�-E�'\|(�0�,��u	olds)�Jz�`'�M>*࠘K5�Ҫ?���0&>:      �   b   x�3�,.�/*J����LL����,.)JL�/��/H�0���KsJ�T::�x��s�pG���r���(Y[[虙��[T����� �y%g     