class MetadataDTO {
  constructor(
    public total?: number,
    public page?: number,
    public lastPage?: number,
    public perPage?: number
  ) {}
}

export default MetadataDTO;
