
CREATE NONCLUSTERED INDEX [_IX_UserGroupAccess_UserGroup_ex]
ON [UserGroupAccess] ([UserGroup])
INCLUDE ([Rasdel],[TableName],[FieldName],[Access],[Ins],[Edt],[Del],[MultiDel],[ReadOnly])
GO

CREATE NONCLUSTERED INDEX [_IX_wms_android_НастройкиТСД_Сотрудник_Параметр] ON [dbo].[_wms_android_НастройкиТСД]
(
	[Сотрудник] ASC,
	[Параметр] ASC
)
INCLUDE ( 	[Значение]) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]

