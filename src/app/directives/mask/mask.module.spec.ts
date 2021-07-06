import { MaskModule } from './mask.module';

describe('MaskModule', () => {
  let maskModule: MaskModule;

  beforeEach(() => {
    maskModule = new MaskModule();
  });

  it('should create an instance', () => {
    expect(maskModule).toBeTruthy();
  });
});
