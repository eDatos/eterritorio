import { TestBed } from "@angular/core/testing";

import { InstanceToPlainInterceptor } from "./instance-to-plain.interceptor";

describe("ClassToPlainInterceptor", () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [InstanceToPlainInterceptor],
        })
    );

    it("should be created", () => {
        const interceptor: InstanceToPlainInterceptor = TestBed.inject(InstanceToPlainInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
