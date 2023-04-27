import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { DatasetsDto } from "@app/core/model";
import { DatasetService, PropertiesService } from "@app/core/service";

const jsonMockGetAllDatasets = `{"dataset":[{"id":"C00031A_000002","urn":"urn:siemac:org.siemac.metamac.infomodel.statisticalresources.Dataset=ISTAC:C00031A_000002(1.13)","selfLink":{"kind":"statisticalResources#dataset","href":"http:\\/\\/localhost:8080\\/metamac-statistical-resources-external-web\\/v1.0\\/datasets\\/ISTAC\\/C00031A_000002\\/1.13"},"name":{"text":[{"value":"\u00cdndice censal de ocupaci\u00f3n seg\u00fan indicadores por islas, provincias y comunidades","lang":"es"},{"value":"Census occupancy index according to indicators by islands, provinces and communities","lang":"en"}]},"kind":"statisticalResources#dataset"},{"id":"C00031A_000004","urn":"urn:siemac:org.siemac.metamac.infomodel.statisticalresources.Dataset=ISTAC:C00031A_000004(002.000)","selfLink":{"kind":"statisticalResources#dataset","href":"http:\\/\\/localhost:8080\\/metamac-statistical-resources-external-web\\/v1.0\\/datasets\\/ISTAC\\/C00031A_000004\\/002.000"},"name":{"text":[{"value":"\u00cdndice censal de ocupaci\u00f3n de plazas hoteleras","lang":"es"}]},"kind":"statisticalResources#dataset"},{"id":"C00031A_000008","urn":"urn:siemac:org.siemac.metamac.infomodel.statisticalresources.Dataset=ISTAC:C00031A_000008(001.000)","selfLink":{"kind":"statisticalResources#dataset","href":"http:\\/\\/localhost:8080\\/metamac-statistical-resources-external-web\\/v1.0\\/datasets\\/ISTAC\\/C00031A_000008\\/001.000"},"name":{"text":[{"value":"\u00cdndice de ocupaci\u00f3n en Canarias","lang":"es"}]},"kind":"statisticalResources#dataset"}],"kind":"statisticalResources#datasets","total":3,"limit":25,"offset":0,"selfLink":"http:\\/\\/localhost:8080\\/metamac-statistical-resources-external-web\\/v1.0\\/datasets?query=geographic_coverage_title ilike 'madrid' and is_last_version eq 'true'&orderBy=id asc&limit=25&offset=0"}`;
describe("DatasetService", () => {
    let service: DatasetService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: PropertiesService,
                    useValue: {
                        getStatisticalResourcesExternalApiUrl(): string {
                            return "https://estadisticas.arte-consultores.com/statistical-resources";
                        }
                    }
                }
            ]
        });
        service = TestBed.inject(DatasetService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("should instance datasets request object", () => {
        service.getAllDatasets().subscribe((res) => {
            expect(res).toBeInstanceOf(DatasetsDto);
        });

        const req = httpMock.expectOne(`${DatasetService.REST_URL}/datasets`);
        req.flush(JSON.parse(jsonMockGetAllDatasets));
    });

    it("should request datasets", () => {
        service.getAllDatasets().subscribe((res) => {
            expect(res.total).toBe(3);
            expect(res.dataset.length).toBe(3);
            expect(res.dataset[0].urn).toBe(
                "urn:siemac:org.siemac.metamac.infomodel.statisticalresources.Dataset=ISTAC:C00031A_000002(1.13)"
            );
        });

        const req = httpMock.expectOne(`${DatasetService.REST_URL}/datasets`);
        req.flush(JSON.parse(jsonMockGetAllDatasets));
    });
});
