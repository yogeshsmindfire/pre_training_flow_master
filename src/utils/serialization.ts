import { AppNode, AppEdge } from '../types';

interface DiagramData {
  nodes: AppNode[];
  edges: AppEdge[];
}

export const downloadJSON = (data: DiagramData, filename = 'diagram.json') => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadXML = (data: DiagramData, filename = 'diagram.xml') => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<diagram>\n';

  xml += '  <nodes>\n';
  data.nodes.forEach((node) => {
    xml += `    <node id="${node.id}" type="${node.type}" x="${node.position.x}" y="${node.position.y}" w="${node.style?.width || 100}" h="${node.style?.height || 100}">\n`;
    xml += `      <label>${node.data.label}</label>\n`;
    // Add other data props as attributes or tags
    xml += `      <style fill="${node.data.fill}" stroke="${node.data.stroke}" />\n`;
    xml += '    </node>\n';
  });
  xml += '  </nodes>\n';

  xml += '  <edges>\n';
  data.edges.forEach((edge) => {
    xml += `    <edge id="${edge.id}" source="${edge.source}" target="${edge.target}" type="${edge.type}" />\n`;
  });
  xml += '  </edges>\n';

  xml += '</diagram>';

  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
