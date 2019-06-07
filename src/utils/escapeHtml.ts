let entityMap: any = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
};

export function escapeHtml(str: string): string {
    return String(str).replace(/[&<>"'`=\/]/g, function (s: string) {
        return entityMap[s];
    });
}