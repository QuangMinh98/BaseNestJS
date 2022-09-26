import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import { CityRepository } from 'src/repositories/mongo/repositories/city.repository';
import { DistrictRepository } from 'src/repositories/mongo/repositories/district.repository';
import { ProjectRepository } from 'src/repositories/mongo/repositories/project.repository';
import { WardRepository } from 'src/repositories/mongo/repositories/ward.repository';
import { RealEstateRepository } from 'src/repositories/mongo/repositories/real-estate.repository';

@Injectable()
export class CrawlerService {
    constructor(
        private readonly cityRepository: CityRepository,
        private readonly districtRepository: DistrictRepository,
        private readonly wardRepository: WardRepository,
        private readonly projectRepository: ProjectRepository,
        private readonly realEstateRepository: RealEstateRepository
    ) {}

    async getJSONDataFromBrowser(url: string) {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
        );
        await page.goto(url);
        const articles = await page.evaluate(async () => {
            return document.querySelector('pre').innerText;
        });

        await browser.close();

        return JSON.parse(articles);
    }

    async getHtmlDataFromBrowser(url: string) {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
        );
        await page.goto(url);
        const articles = await page.evaluate(async () => {
            return document.querySelector('*').outerHTML;
        });

        await page.close();
        await browser.close();

        return articles;
    }

    async getCities() {
        const url = 'https://batdongsan.com.vn/Product/ProductSearch/GetCities';
        const result = [];

        const cities = await this.getJSONDataFromBrowser(url);
        for (const city of cities) {
            const existItem = await this.cityRepository.findOne({ code: city.code });
            if (existItem) {
                const updateItem = await this.cityRepository.findByIdAndUpdate(existItem._id, {
                    code: city.code,
                    name: city.name
                });

                result.push(updateItem);
            } else {
                const newItem = await this.cityRepository.create(city);
                result.push(newItem);
            }
        }

        return result;
    }

    async getDistricts() {
        const url = 'https://batdongsan.com.vn/Product/ProductSearch/GetDistricts';
        const result = [];

        const districts = await this.getJSONDataFromBrowser(url);
        for (const district of districts) {
            const data: any = { districtId: district.districtId, name: district.name };

            const city = await this.cityRepository.findOne({ code: district.cityCode });
            if (city) data.cityId = city._id;

            const existItem = await this.districtRepository.findOne({ districtId: district.districtId });
            if (existItem) {
                const updateItem = await this.districtRepository.findByIdAndUpdate(existItem._id, data);
                result.push(updateItem);
            } else {
                const newItem = await this.districtRepository.create(data);
                result.push(newItem);
            }
        }

        return result;
    }

    async getWards() {
        const baseUrl = 'https://batdongsan.com.vn/Product/ProductSearch/GetWardsByDistrictIds';
        const districts = await this.districtRepository.find();
        let results = [];

        // Can not get all ward by all district
        // Get district per 50 districts
        for (let i = 0; i < Math.ceil(districts.length / 50); i++) {
            console.log((i + 1) * 50);

            // Index of list of districts
            // Ex: If wanna get wards by first 50 districts, first index will be 0 and last index will be 49
            const firstIndex = i * 50;
            const lastIndex = (i + 1) * 50 - 1;

            let url = baseUrl;
            for (let j = firstIndex; j < lastIndex; j++) {
                // Index of list of districts u wanna get their wards
                const index = j % 50;

                if (districts[j]) {
                    if (index === 0) url = url + `?districtIds[${index.toString()}]=${districts[j].districtId}`;
                    else url = url + `&districtIds[${index.toString()}]=${districts[j].districtId}`;
                }
            }
            const wards = await this.getJSONDataFromBrowser(url);
            results = [...results, ...wards];
        }

        for (const ward of results) {
            const district = districts.find((x) => x.districtId == ward.districtId);
            ward.districtId = district._id;

            console.log(ward);

            const existedItem = await this.wardRepository.findOne({ wardId: ward.wardId });
            if (existedItem) {
                const updateItem = await this.wardRepository.findByIdAndUpdate(existedItem._id, {
                    wardId: ward.wardId,
                    name: ward.name,
                    districtId: ward.districtId
                });
            } else {
                const newItem = await this.wardRepository.create({
                    wardId: ward.wardId,
                    name: ward.name,
                    districtId: ward.districtId
                });
            }
        }

        return results;
    }

    async getProject() {
        const baseUrl = 'https://batdongsan.com.vn/Product/ProductSearch/GetProjectsByDistrictIds';
        const districts = await this.districtRepository.find();
        let results = [];

        // Can not get all ward by all district
        // Get district per 50 districts
        for (let i = 0; i < Math.ceil(districts.length / 50); i++) {
            console.log((i + 1) * 50);

            // Index of list of districts
            // Ex: If wanna get wards by first 50 districts, first index will be 0 and last index will be 49
            const firstIndex = i * 50;
            const lastIndex = (i + 1) * 50 - 1;

            let url = baseUrl;
            for (let j = firstIndex; j < lastIndex; j++) {
                // Index of list of districts u wanna get their wards
                const index = j % 50;

                if (districts[j]) {
                    if (index === 0) url = url + `?districtIds[${index.toString()}]=${districts[j].districtId}`;
                    else url = url + `&districtIds[${index.toString()}]=${districts[j].districtId}`;
                }
            }
            const wards = await this.getJSONDataFromBrowser(url);
            results = [...results, ...wards];
        }

        for (const project of results) {
            const district = districts.find((x) => x.districtId == project.districtId);
            project.districtId = district._id;

            console.log(project);

            const existedItem = await this.projectRepository.findOne({ projectId: project.projectId });
            if (existedItem) {
                const updateItem = await this.projectRepository.findByIdAndUpdate(existedItem._id, {
                    projectId: project.projectId,
                    name: project.name,
                    districtId: project.districtId
                });
            } else {
                const newItem = await this.projectRepository.create({
                    projectId: project.projectId,
                    name: project.name,
                    districtId: project.districtId
                });
            }
        }

        return results;
    }

    async getRealEstate() {
        const baseUrl = 'https://batdongsan.com.vn/nha-dat-ban';
        const totalPages = 10; // 10143
        const currentPage = 1;
        const data = [];
        const listItems = [];

        for (let pageNumber = currentPage; pageNumber <= totalPages; pageNumber++) {
            console.log(pageNumber);
            const getHtmlDataFromBrowser = this.getHtmlDataFromBrowser;
            const url = `${baseUrl}/p${pageNumber.toString()}`;
            const html = await this.getHtmlDataFromBrowser(url);
            const $ = cheerio.load(html);
            $('a.js__product-link-for-product-id').each(function (index) {
                const realEstateId = $(this).attr('data-product-id');
                const title = $(this).attr('title');
                const url = $(this).attr('href');
                const firstImage = $(this).find('img').attr('data-img');
                const listImages = $(this).find('img').attr('data-listing').split(',');
                const price = $(this).find('span.re__card-config-price').text().split(' ')[0];
                const area = $(this).find('span.re__card-config-area').text().split(' ')[0];
                const pricePerM2 = $(this).find('span.re__card-config-price_per_m2').text().split(' ')[0];
                // const detailHtml = await getHtmlDataFromBrowser('https://batdongsan.com.vn' + url);

                // Get deatil information
                // const $$ = cheerio.load(detailHtml);
                // const description = $$(
                //     're__section-body.re__detail-content.js__section-body.js__pr-description.js__tracking'
                // ).html();

                data.push({
                    realEstateId,
                    title,
                    url,
                    images: [firstImage, ...listImages],
                    price: isNaN(Number(price)) ? -1 : Number(price),
                    area: Number(area),
                    pricePerM2: isNaN(Number(pricePerM2)) ? -1 : Number(pricePerM2)
                });
            });
        }

        for (const item of data) {
            const existedItem = await this.realEstateRepository.findOne({ realEstateId: item.realEstateId });
            if (existedItem) {
                const updatedItem = await this.realEstateRepository.findByIdAndUpdate(existedItem._id, {
                    realEstateId: item.realEstateId,
                    title: item.title,
                    url: item.url,
                    images: item.images,
                    price: item.price,
                    area: item.area,
                    pricePerM2: item.pricePerM2
                });
                listItems.push(updatedItem);
            } else {
                const newItem = await this.realEstateRepository.create({
                    realEstateId: item.realEstateId,
                    title: item.title,
                    url: item.url,
                    images: item.images,
                    price: item.price,
                    area: item.area,
                    pricePerM2: item.pricePerM2
                });
                listItems.push(newItem);
            }
        }

        return data;
    }

    async getDetailRealEstate() {
        const baseUrl = 'https://batdongsan.com.vn';

        const limit = 100;
        const offset = 0;

        const data = [];

        const districts = await this.districtRepository.find();
        const wards = await this.wardRepository.find();
        const projects = await this.projectRepository.find();

        const realEstates = await this.realEstateRepository.find().limit(limit).skip(offset);
        for (const realEstate of realEstates) {
            const updateData: any = {
                contentItems: [],
                keywords: []
            };

            const html = await this.getHtmlDataFromBrowser(baseUrl + realEstate.url);
            const $ = cheerio.load(html);

            const description = $(
                'div.re__section-body.re__detail-content.js__section-body.js__pr-description.js__tracking'
            ).html();
            updateData.description = description;

            const ggMapUrl = $('iframe').attr('data-src');
            updateData.ggMapUrl = ggMapUrl;

            $('a.re__tag--md').each(function (index) {
                const keyword = $(this).text();
                updateData.keywords.push(keyword);
            });

            $('div.re__pr-specs-content-item').each(function (index) {
                const itemTitle = $(this).find('span.re__pr-specs-content-item-title').text();
                const itemValue = $(this).find('span.re__pr-specs-content-item-value').text();

                // if (itemTitle === 'Số toilet')
                //     updateData.numberOfToilets = itemValue ? Number(itemValue.split(' ')[0]) : null;
                // if (itemTitle === 'Số phòng ngủ')
                //     updateData.numberOfBedRooms = itemValue ? Number(itemValue.split(' ')[0]) : null;

                updateData.contentItems.push({
                    key: itemTitle,
                    value: itemValue
                });
            });

            const updateRealEstate = await this.realEstateRepository.findByIdAndUpdate(realEstate._id, updateData, {
                new: true
            });

            data.push(updateRealEstate);
        }

        return data;
    }
}
