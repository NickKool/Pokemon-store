import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { downloadCsv } from './downloadCsv';

interface PokemonData {
  id: string | number;
  name: string;
  description?: string;
  url?: string;
}

describe('downloadCsv', () => {
  const mockCreateObjectURL = vi.fn();
  const mockRevokeObjectURL = vi.fn();
  const mockClick = vi.fn();

  const currentOrigin = window.location.origin;

  beforeEach(() => {
    vi.clearAllMocks();

    mockCreateObjectURL.mockReturnValue('blob:http://localhost:7777/mock-uuid');
    window.URL.createObjectURL = mockCreateObjectURL;
    window.URL.revokeObjectURL = mockRevokeObjectURL;

    window.HTMLAnchorElement.prototype.click = mockClick;

    vi.spyOn(document.body, 'appendChild');
    vi.spyOn(document.body, 'removeChild');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should correctly generate CSV string with headers and valid data', async () => {
    const testData: PokemonData[] = [
      {
        id: 25,
        name: 'Pikachu',
        description: 'Mouse "Electric" Pokemon',
      },
    ];

    downloadCsv(testData);

    expect(mockCreateObjectURL).toHaveBeenCalledTimes(1);
    const createdBlob = mockCreateObjectURL.mock.calls[0][0] as Blob;
    expect(createdBlob.type).toBe('text/csv;charset=utf-8;');

    const fullText = await createdBlob.text();
    const textWithoutBOM = fullText.startsWith('\uFEFF') ? fullText.slice(1) : fullText;

    const expectedCsv = [
      'ID,Name,Description,Detail URL',
      `25,"Pikachu","Mouse ""Electric"" Pokemon","${currentOrigin}/pokemon/25"`,
    ].join('\n');

    expect(textWithoutBOM).toBe(expectedCsv);

    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    const createdLink = vi.mocked(document.body.appendChild).mock.calls[0][0] as HTMLAnchorElement;

    expect(createdLink.href).toBe('blob:http://localhost:7777/mock-uuid');
    expect(createdLink.getAttribute('download')).toBe('1_items.csv');
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(document.body.removeChild).toHaveBeenCalledTimes(1);
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:http://localhost:7777/mock-uuid');
  });

  it('should use default values if name and description are missing', async () => {
    const incompleteData: PokemonData[] = [
      {
        id: '1',
        name: '',
      },
    ];

    downloadCsv(incompleteData);

    const createdBlob = mockCreateObjectURL.mock.calls[0][0] as Blob;
    const fullText = await createdBlob.text();
    const textWithoutBOM = fullText.startsWith('\uFEFF') ? fullText.slice(1) : fullText;

    const expectedCsv = [
      'ID,Name,Description,Detail URL',
      `1,"Unknown","A Pokémon discovered in the wild","${currentOrigin}/pokemon/1"`,
    ].join('\n');

    expect(textWithoutBOM).toBe(expectedCsv);

    const createdLink = vi.mocked(document.body.appendChild).mock.calls[0][0] as HTMLAnchorElement;
    expect(createdLink.getAttribute('download')).toBe('1_items.csv');
  });
});
