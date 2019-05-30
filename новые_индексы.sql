
CREATE NONCLUSTERED INDEX [_IX_UserGroupAccess_UserGroup_ex]
ON [UserGroupAccess] ([UserGroup])
INCLUDE ([Rasdel],[TableName],[FieldName],[Access],[Ins],[Edt],[Del],[MultiDel],[ReadOnly])
GO

