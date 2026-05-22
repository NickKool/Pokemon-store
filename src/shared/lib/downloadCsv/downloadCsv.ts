interface PokemonData {
  id: string | number;
  name: string;
  description?: string;
  url?: string;
}

const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:7777';
const baseUrl = import.meta.env.BASE_URL;
const fullBaseUrl = `${origin}${baseUrl}`.replace(/([^:]\/)\/+/g, '$1');

export function downloadCsv(data: PokemonData[]): void {
  const fileCount = data.length;

  const headers = ['ID', 'Name', 'Description', 'Detail URL'];

  const rows = data.map((pokemon) => {
    const id = pokemon.id;
    const name = pokemon.name || 'Unknown';

    const description = pokemon.description || 'A Pokémon discovered in the wild';
    const detailUrl = `${fullBaseUrl}pokemon/${id}`;

    return [id, `"${name}"`, `"${description.replace(/"/g, '""')}"`, `"${detailUrl}"`];
  });

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const fileUrl = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = fileUrl;

  downloadLink.setAttribute('download', `${fileCount}_items.csv`);

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  URL.revokeObjectURL(fileUrl);
}
